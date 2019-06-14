#!/bin/bash

if [ "$TRAVIS_BRANCH" == 'desktop' ] ; then
    if [ ! -z $GIT_ORG_PRIVATE ] && [ ! -z $GIT_TOKEN ] ; then
        if [ "$TRAVIS_OS_NAME" == 'linux' ] ; then
            echo 'Linux desktop build'
            ./scripts/linux.sh
        elif [ "$TRAVIS_OS_NAME" == 'osx' ] ; then
            ./scripts/osx.sh
            echo 'OSX desktop build'
        elif [ "$TRAVIS_OS_NAME" == 'windows' ] ; then
            echo 'Windows desktop build'
            ./scripts/windows.sh
        fi
    fi
elif [ "$TRAVIS_OS_NAME" == 'linux' ] ; then
    # Only build PGB from Linux.
    echo 'PGB Mobile build'
    ./scripts/pgb.sh
fi

exit 0




