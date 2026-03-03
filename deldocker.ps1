# Stop all running containers
$containers = docker ps -aq
if ($containers) {
    docker stop $containers
    docker rm $containers
}

# Remove all images
$images = docker images -aq
if ($images) {
    docker rmi -f $images
}

# Remove all volumes
$volumes = docker volume ls -q
if ($volumes) {
    docker volume rm $volumes
}

# Remove all networks (except default ones)
$networks = docker network ls -q | Where-Object { $_ -ne "bridge" -and $_ -ne "host" -and $_ -ne "none" }
if ($networks) {
    docker network rm $networks
}

# Clean up system
docker system prune -a --volumes -f

Write-Host "Docker cleanup completed."
