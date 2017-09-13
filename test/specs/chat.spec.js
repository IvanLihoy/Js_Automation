const LoginPage = require('../pageobjects/login.page');
const ChatPage = require('../pageobjects/chat.page');

describe('login to Slack app and entering the chat', function () {
    it('should open app', function () {
        LoginPage.open();
    })

    it('should login from 2 accounts', function () {
        //retry (1 time) if test fails 
        this.retries(1);
        LoginPage.inputLoginCreds(LoginPage.usernameA, LoginPage.passwordA, 'elena.chornobai@gmail.com', 'hillelproject123');
        LoginPage.inputLoginCreds(LoginPage.usernameB, LoginPage.passwordB, 'echornobai@intersog.com', 'hillelproject000');
        browser.sync();
        LoginPage.submitFormAndLogin();
    })

    it('should enter a chat', function () {
        //skip this test if login failed
        if (!LoginPage.teamOwnerNameA.isVisible() || !LoginPage.teamOwnerNameB.isVisible()) {
            this.skip();
        }
        ChatPage.enterChat();
    })
})

describe('chat application', function () {
    //skip this whole test suite if the chat is not entered
    before(function () {
        (!ChatPage.enteredDirMsgsA.isExisting() || !ChatPage.enteredDirMsgsB.isExisting()) && this.skip();
    })

    it('browser_A user should send a message to browser_B user', function () {
        ChatPage.sendMessageAtoB();
    })

    it('browser_B user should respond to a message from browser_A user', function () {
        ChatPage.sendMessageBToA();
    })

    it('browser_B user should delete his message', function () {
        ChatPage.deleteMessageSentByB();
    })

    it('browser_A user should call browser_B user', function () {
        ChatPage.ACallB();
    })

    it('browser_B user should accept the call from browser_A user', function () {
        ChatPage.AAcceptBCall();
    });

    it('browser_A user should hang up', function () {
        ChatPage.hangUp();
    });

})

