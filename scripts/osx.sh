#!/bin/bash
#
# Script for generating the Desktop builds for MacOS
#

npm install -g electron electron-builder@20.41.0 electron-osx-sign

electron-builder install-app-deps

if [ ! -z $GIT_ORG_PRIVATE ] && [ ! -z $GIT_TOKEN ] ; then
    # Install certificates.
    git clone -q https://$GIT_TOKEN@github.com/$GIT_ORG_PRIVATE/bmma-apps-data.git ../apps-data
    pushd ../apps-data

    git checkout desktop

    CSC_KEYCHAIN='/tmp/moodle.keychain'
    KEYCHAIN_PASSWORD='travis'

    security create-keychain -p $KEYCHAIN_PASSWORD $CSC_KEYCHAIN
    security unlock-keychain -p $KEYCHAIN_PASSWORD $CSC_KEYCHAIN
    security default-keychain -s $CSC_KEYCHAIN

    security import certs/mac_dist.p12 -k $CSC_KEYCHAIN -P $CSC_KEY_PASSWORD -A -T /usr/bin/codesign
    security import certs/mac_dev.p12 -k $CSC_KEYCHAIN -P $CSC_KEY_PASSWORD -A -T /usr/bin/codesign

    popd
fi


# Generate dev build.
rm -Rf desktop/dist

CSC_LINK="file://$(pwd)/../apps-data/certs/mac_dev.p12"

npm run desktop.dist -- -m

if [ ! -z $GIT_ORG_PRIVATE ] && [ ! -z $GIT_TOKEN ] ; then
    git clone -q https://$GIT_TOKEN@github.com/$GIT_ORG_PRIVATE/bma-apps-builds.git ../apps

    app_target='desktop/dist/mas/Moodle Desktop.app'
    electron-osx-sign "${app_target}" --type=development --platform=mas --provisioning-profile=../apps-data/certs/mac_dev.provisionprofile --entitlements=desktop/assets/mac/parent.plist --entitlements-inherit=desktop/assets/mac/child.plist --identity="Mac Developer: Juan Leyva Delgado (6C49E7GDJ4)" --verbose

    mv "${app_target}" ../apps

    # Generate production build.
    CSC_LINK="file://$(pwd)/../apps-data/certs/mac_dist.p12"

    rm -Rf desktop/dist

    npm run desktop.dist -- -m
    app_target='desktop/dist/mas/Moodle Desktop.pkg'
    ./desktop/assets/mac/sign.sh

    mv "${app_target}" "../apps/MoodleDesktopOSX.pkg"

    cd ../apps

    tar -czf MoodleDesktopOSX.tar.gz "Moodle Desktop.app"
    rm -Rf "Moodle Desktop.app"

    ls

    git add .
    git commit -m "OSX desktop versions from Travis build $TRAVIS_BUILD_NUMBER"
    git pull --rebase
    git push
fi
