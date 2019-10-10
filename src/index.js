const {Switcher} = require('tbrex');

const LockCommand = require('./commands/lockCommand');
const UnlockCommand = require('./commands/unlockCommand');

const ContactCommand = require('./commands/contactCommand');

const options = {
  'lock': new LockCommand(),
  'unlock':  new UnlockCommand()
  //  'contact': new ContactCommand()
}

module.exports = new Switcher({options});
