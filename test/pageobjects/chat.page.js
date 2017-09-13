const Page = require('../pageobjects/page');


const ChatPage = Object.create(Page, {
    messageAToB: { value: 'Hello! My name is Helen' },
    messageBtoA: { value: 'Hi Helen! Welcome to the team!' },
    directMessageButtonA: { get: () => browserA.element('a[aria-label*=echornobai] span') },
    messageInputA: { get: () => browserA.element('div#msg_input div[aria-label*=Message]') },
    lastMessageinAChat: { get: () => browserA.element('//div[@aria-label="Today"]/ancestor::div[@class="day_container"]//ts-message[last()]//span[@class="message_body"]') },
    lastMessageDateinAChat: { get: () => browserA.element('//div[@aria-label="Today"]/ancestor::div[@class="day_container"]//ts-message[last()]//span[@class="time_star_and_extra_metadata"]//i[1]') },
    enteredDirMsgsA: { get: () => browserA.element('a[aria-label*=echornobai][aria-label*=selected]') },
    callButtonA: { get: () => browserA.element('//button[contains(@class,"voice_call")]') },
    hangUpAButton: { get: () => browserA.element('button#hangup') },
    endedCallIconA: { get: () => browserA.element('//div[@class="day_container"][last()]//ts-message[last()]//span[@class="message_body"]//p[contains(text(),"call has ended")]') },

    directMessageButtonB: { get: () => browserB.element('a[aria-label*=elena] span') },
    lastMessageinBChat: { get: () => browserB.element('//div[@aria-label="Today"]/ancestor::div[@class="day_container"]//ts-message[last()]//span[@class="message_body"]') },
    messageInputB: { get: () => browserB.element('div#msg_input div[aria-label*=Message]') },
    lastMessageDateinBChat: { get: () => browserB.element('//div[@aria-label="Today"]/ancestor::div[@class="day_container"]//ts-message[last()]//span[@class="time_star_and_extra_metadata"]//i[1]') },
    enteredDirMsgsB: { get: () => browserB.element('a[aria-label*=elena][aria-label*=selected]') },
    acceptCallB: { get: () => browserB.element('//a[contains(@class, "accept_audio")]') },
    endedCallIconB: { get: () => browserB.element('//div[@class="day_container"][last()]//ts-message[last()]//span[@class="message_body"]//p[contains(text(),"call has ended")]') },
    lastsentMessageBOptions: { get: () => browserB.element('//div[@class="day_container"][last()]//ts-message[last()]//button[@aria-label="Show message actions"]') },
    deleteMessageB: { get: () => browserB.element('#delete_link a') },
    confirmMessageBDeletion: { get: () => browserB.element('//button[contains(text(),"Delete")]') },

    enterChat: {
        value: function () {
            browser.elementToBeClickable(this.directMessageButtonA, 5000);
            browser.elementToBeClickable(this.directMessageButtonB, 5000);
            this.directMessageButtonA.click();
            this.directMessageButtonB.click();
        }
    },

    compareSentMsgTextandDate: {
        value: function (msgSelector, msgText) {
            expect(msgSelector.getText()).to.equal(msgText);
            expect(this.lastMessageDateinAChat.getText()).to.equal(this.lastMessageDateinBChat.getText());
        }
    },

    sendMessageAtoB: {
        value: function () {
            this.messageInputA.setValue(this.messageAToB).keys("Enter");
            browser.pause(5000);
            this.compareSentMsgTextandDate(this.lastMessageinBChat, this.messageAToB);
        }
    },

    sendMessageBToA: {
        value: function () {
            this.messageInputB.setValue(this.messageBtoA).keys('Enter');
            browser.pause(5000);
            this.compareSentMsgTextandDate(this.lastMessageinAChat, this.messageBtoA);
        }
    },

    deleteMessageSentByB: {
        value: function () {
            this.lastMessageinBChat.click();
            this.lastsentMessageBOptions.click();
            this.deleteMessageB.click();
            this.confirmMessageBDeletion.waitForVisible();
            this.confirmMessageBDeletion.click();
            expect(this.lastMessageinAChat.getText()).not.to.equal(this.messageBToA);
            expect(this.lastMessageinBChat.getText()).not.to.equal(this.messageBToA);
        }
    },

    ACallB: {
        value: function () {
            this.callButtonA.click();
            browserA.getTabsAndSwitch();
            this.hangUpAButton.waitForVisible();
        }
    },

    AAcceptBCall: {
        value: function () {
            this.acceptCallB.waitForVisible();
            this.acceptCallB.click();
            //stay on the line for 15 seconds
            browser.pause(15000);
            expect(this.acceptCallB.isVisible()).to.be.false;
        }
    },

    hangUp: {
        value: function () {
            this.hangUpAButton.click();
            browser.pause(2000);
            browserA.getTabsAndSwitch();
            expect(this.endedCallIconB.isVisible()).to.be.true;
            expect(this.endedCallIconA.isVisible()).to.be.true;
        }
    }

});

module.exports = ChatPage;
