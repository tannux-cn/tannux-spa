#!/bin/bash
cd `dirname $0`
BIN_DIR=`pwd`
cd ..
DEPLOY_DIR=`pwd`
CONF_DIR=$DEPLOY_DIR/conf
RETRY_COUNT=30


PIDS=`ps -ef | grep java | grep "$CONF_DIR" |awk '{print $2}'`
if [ -z "$PIDS" ]; then
    echo "ERROR: The application does not started!"
    exit 1
fi

if [ "$1" != "skip" ]; then
    $BIN_DIR/dump.sh
fi

echo -e "Stopping the application ["$PIDS"]...\c"
for PID in $PIDS ; do
    kill $PID > /dev/null 2>&1
done

COUNT=0
PID_EXIST=""
while [ $COUNT -lt $RETRY_COUNT ]; do    
    echo -e ".\c"
    sleep 1
    for PID in $PIDS ; do
        PID_EXIST=`ps -f -p $PID | grep java`
        if [ -n "$PID_EXIST" ]; then
            COUNT=`expr $COUNT + 1`
            break
        fi
    done
    if [ -z "$PID_EXIST" ]; then
        break
    fi
done

if [ -n "$PID_EXIST" ]; then
    echo -e "FAILED!"
    echo -e "retry ...\c"
    for PID in $PIDS ; do
        kill -9 $PID > /dev/null 2>&1
    done

    COUNT=0
    PID_EXIST=""
    while [ $COUNT -lt $RETRY_COUNT ]; do
        echo -e ".\c"
        sleep 1
        for PID in $PIDS ; do
            PID_EXIST=`ps -f -p $PID | grep java`
            if [ -n "$PID_EXIST" ]; then
                COUNT=`expr $COUNT + 1`
                break
            fi
        done
        if [ -z "$PID_EXIST" ]; then
            break
        fi
    done
fi

if [ -n "$PID_EXIST" ]; then
    echo "FAILED!"
else
    echo "OK!"
fi
