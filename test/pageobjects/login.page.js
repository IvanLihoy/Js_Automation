const Page = require('./page');

const LoginPage = Object.create(Page, {

    usernameA: { get: () => browserA.element('input[type=email]') },
    passwordA: { get: () => browserA.element('input[type=password]') },
    usernameB: { get: () => browserB.element('input[type=email]') },
    passwordB: { get: () => browserB.element('input[type=password]') },
    teamOwnerNameA: { get: () => browserA.element('span#team_menu_user_name') },
    teamOwnerNameB: { get: () => browserB.element('span#team_menu_user_name') },

    open: {
        value: function () {
            Page.open.call(this, 'signin');
        }
    },
    inputLoginCreds: {
        value: function (usernameElem, passwordElem, loginName, password) {
            usernameElem.setValue(loginName);
            passwordElem.setValue(password);
        }
    },
    submitFormAndLogin: {
        value: function () {
            browser.keys('Enter');
            this.teamOwnerNameA.waitForVisible(10000);
            this.teamOwnerNameB.waitForVisible(10000);
        }
    }
});

module.exports = LoginPage;
