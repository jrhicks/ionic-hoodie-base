chmod -R 777 /etc/couchdb/

# Use a Hoodie Template
cd /home/vagrant
npm install -g hoodie-cli
hoodie new hoodie_app
cd /home/vagrant/hoodie_app
npm install

chown -R vagrant /home/vagrant/hoodie_app
export HOODIE_BIND_ADDRESS=0.0.0.0

# hoodie admin password is "hd"

su vagrant -l -c 'cd /home/vagrant/hoodie_app && bash -i echo hd | hoodie start -n'

# Add bind_address = 0.0.0.0 to couch.ini
sed -f /vagrant/manifests/couch_sed.cmd /home/vagrant/hoodie_app/data/couch.ini > /home/vagrant/hoodie_app/data/couch.tmp
cp /home/vagrant/hoodie_app/data/couch.tmp /home/vagrant/hoodie_app/data/couch.ini
