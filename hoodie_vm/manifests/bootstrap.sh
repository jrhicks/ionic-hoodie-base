chmod -R 777 /etc/couchdb/

# Use a Hoodie Template
cd /home/vagrant
npm install -g hoodie-cli
hoodie new hoodie_app
cd /home/vagrant/hoodie_app
npm install

# Install bower components
chown -R vagrant /home/vagrant/hoodie_app
export HOODIE_BIND_ADDRESS=0.0.0.0

# hoodie admin password is "hd"
su vagrant -l -c 'cd /home/vagrant/hoodie_app && bash -i echo hd | hoodie start -n'
