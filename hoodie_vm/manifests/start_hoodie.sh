export HOODIE_BIND_ADDRESS=0.0.0.0

# hoodie admin password is "hd"
su vagrant -l -c 'cd /home/vagrant/hoodie_app && bash -i echo hd | hoodie start -n'
