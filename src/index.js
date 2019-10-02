const {Switcher} = require('tbrex');

const LockCommand = require('./commands/lockCommand');
const UnockCommand = require('./commands/unlockCommand');

const options = {
  'lock': new LockCommand(),
  'unlock':  new UnockCommand()
}

module.exports = new Switcher({options});
