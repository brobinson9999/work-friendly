#!/bin/sh

. bash-colors.sh

initial_branch=$(current-branch.sh)
switch_to_branch=$1
# Eat first parameter before slurping the rest into $command.
shift
command=$@

echo Currently on branch $color_branch$initial_branch$color_reset, executing "$color_command$command$color_reset" on branch $color_branch$switch_to_branch$color_reset.
git checkout $switch_to_branch
echo ""
$command
echo ""

echo Done command, switching back to $color_branch$initial_branch$color_reset.
git checkout $initial_branch