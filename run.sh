#!/bin/bash
cd /home/ec2-user/creditcard-comparor
npm install
npm run build
sudo pm2 start npm -- start