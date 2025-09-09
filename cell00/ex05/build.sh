if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    for fn in "$@"; do
        mkdir "ex$fn"
        touch -t 202506142342 "ex$fn"
    done
fi
chmod +x build.sh