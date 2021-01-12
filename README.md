# Cardano CLI REST server

The Cardano CLI REST server as been developed to work in tandem with the 
[cardanocli-js](https://github.com/Berry-Pool/cardanocli-js) library. The server provides integration with a remote 
cardano-cli & cardano-node installation.

The cardanocli-js library can be initiated to use a http provider or a local `cardano-cli` binary executable.
By leveraging this capability, you can now use the same underlying library to build portable software that can connect
and submit transaction on the network. Sound's great right?!

## REST server API Documentation

You can find more information on the REST API by following the link bellow:

[https://app.swaggerhub.com/apis-docs/pascallapointe/cardanocli-rest/1.0.0](https://app.swaggerhub.com/apis-docs/pascallapointe/cardanocli-rest/1.0.0)

## Server installation

First, NodeJs, npm, PM2, Nginx and CertBot must be installed on ubuntu server.
If everything is installed, jump to the deployment guide bellow.

> PM2, Nginx and Certbot are optional on a private network, but strongly recommended a public server.

### NodeJs installation
Install nodeJs by running the following cli command:

    sudo apt update
    sudo apt install nodejs

> Check installation by running the following command: `nodejs -v`

### npm installation

    sudo apt install npm


### PM2 installation
PM2 is a daemon process manager that will help you manage and keep your application online 24/7.

1. Install **PM2** with `npm`:

        npm install pm2 -g

2. Start PM2 using the config file `ecosystem.config.js` at the project root:

        pm2 start ecosystem.config.js

See PM2 documentation on the [official website](https://pm2.keymetrics.io/).

### Nginx installation

Here [DigitalOcean documentation](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
on how to install Nginx on Ubuntu server 20.04.

> NodeJs should never be accessible directly from the public internet. Use Nginx as it is better suited for this.

### CertBot installation

Got to the [official website](https://certbot.eff.org/) for installation instructions.

> CertBot allow you to use https with Nginx. **NEVER** use the REST server without **https** on a public server.

## Deployment Guide
1. Clone git repository using the **last released version**.
   

2. Install dependencies by running `npm install` in the shell.
   

3. Copy `config.yaml.dist` to `config.yaml` and changes parameters values to fit your environment.

   
4. Copy `.env.dist` file to `.env` and replace `PORT` parameter value.


5. If using npm directly, start the application using `npm run start`.


6. If using PM2, start the application using `pm2 start ecosystem.config.js`.
   

7. Add necessary Nginx configuration in `sites-available` to create a reverse proxy to your `NodeJs app listening PORT`.


8. Finally, add https support to your nginx conf. file by running `sudo certbot --nginx`.