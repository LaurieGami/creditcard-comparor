#!/bin/bash
cd /home/ec2-user/creditcard-comparor
npm install
sudo npm run build
sudo pm2 stop npm
sudo pm2 start npm -- start