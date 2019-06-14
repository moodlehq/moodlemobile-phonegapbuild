#!/bin/bash
#
# Script for generating the Desktop builds for Windows
#

npm install -g electron electron-builder@20.41.0 electron-windows-store > /dev/null

# Notifications are not working.
# npm install electron-windows-notifications electron-builder-squirrel-windows electron-rebuild > /dev/null

electron-builder install-app-deps

if [ ! -z $GIT_ORG_PRIVATE ] && [ ! -z $GIT_TOKEN ] ; then
    # Install certificates.
    git clone -q https://$GIT_TOKEN@github.com/$GIT_ORG_PRIVATE/bmma-apps-data.git ../apps-data
    pushd ../apps-data

    git checkout desktop

    OWNER="$(cut -d'/' -f1 <<<"$TRAVIS_REPO_SLUG")"
    if [ ! -z $CSC_KEY_PASSWORD ] ; then
        PFX_FILE="winpass.pfx"
        powershell -ExecutionPolicy Unrestricted -command "\$Password = ConvertTo-SecureString -String \"${CSC_KEY_PASSWORD}\" -AsPlainText -Force
        Import-PfxCertificate -FilePath certs/${PFX_FILE} -CertStoreLocation Cert:\LocalMachine\My -Password \$Password"
    else
        PFX_FILE="win.pfx"
        powershell -ExecutionPolicy Unrestricted -command "Import-PfxCertificate -FilePath certs/${PFX_FILE} -CertStoreLocation Cert:\LocalMachine\My"
    fi

    CSC_LINK="C:\\Users\\travis\\build\\${OWNER}\\apps-data\\certs\\${PFX_FILE}"

    echo '{
      "desktopConverter": false,
      "expandedBaseImage": false,
      "windowsKit": "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.17134.0\\x86",
      "publisher": "CN=33CDCDF6-1EB5-4827-9897-ED25C91A32F6",
      "devCert": "C:\\Users\\travis\\build\\'${OWNER}'\\apps-data\\certs\\'${PFX_FILE}'"
    }' > ~/.electron-windows-store

    popd
fi

jq -s '.[0] + {"name": "moodledesktop"}' package.json > package_new.json
mv package_new.json package.json

# Notifications are not working. Should match with package.json electron version.
# electron-rebuild -v 5.0.4

rm -Rf desktop/dist

powershell -command 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned'

npm run desktop.pack -- -w

# TODO: Right now, it will fail signing...
if [ ! -z $CSC_KEY_PASSWORD ] ; then
    npm run windows.store -- --cert-pass=${CSC_KEY_PASSWORD}
else
    npm run windows.store
fi

sed -ie "s/\"appx\"/\"nsis\"/1" package.json
rm package.jsone

rm -Rf desktop/dist
npm run desktop.dist -- -w --x64 --ia32

if [ ! -z $GIT_ORG_PRIVATE ] && [ ! -z $GIT_TOKEN ] ; then
    git clone -q https://$GIT_TOKEN@github.com/$GIT_ORG_PRIVATE/bma-apps-builds.git ../apps

    mv desktop/store/MoodleDesktop.appx "../apps/MoodleDesktopWin.appx"
    mv desktop/dist/Moodle*.exe "../apps/MoodleDesktopWin.exe"

    cd ../apps

    ls

    git config user.email "travis@moodle.invalid"
    git config user.name "Travis CI"

    git add .
    git commit -m "Win desktop versions from Travis build $TRAVIS_BUILD_NUMBER"
    git pull --rebase
    git push
fi
