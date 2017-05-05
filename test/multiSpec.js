const {expect} = require('chai');
const genfun = require('genfun');

const s = require('../lib/spec');

const {isInt, isString} = s.utils;

describe('Test the multispec function', () => {
    before(() => {
        s.def(':event/type', isString);
        s.def(':event/timestamp', isInt);
        s.def(':search/url', isString);

        s.def(':error/message', isString);
        s.def(':error/code', isInt);        

        const eventType = genfun();

        eventType.add([':event/search'],
                      () => s.keys({req: [':event/type', ':event/timestamp', ':search/url']}));

        eventType.add([':event/error'], () => s.keys({req: [':event/type', ':event/timestamp',
                                                            ':error/message', ':error/code']}));

        s.def(':event/event', s.multiSpec(eventType, ':event/type'));
    });

    it('validate using a multispec', () => {
        expect(s.isValid(':event/event', {
            ':event/type': ':event/search',
            ':event/timestamp': 146397012300,
            ':search/url': 'https://clojure.org'
        })).to.be.true;

        expect(s.isValid(':event/event', {
            ':event/type': ':event/error',
            ':event/timestamp': 146397012300,
            ':error/message': 'Invalid host',
            ':error/code': 500
        })).to.be.true;
    });

    it('fail on unknown event type', () => {
        expect(s.isValid(':event/event', {
            ':event/type': ':event/restart'
        })).to.be.false;
    });
    
    it('fail on invalid data', () => {
        expect(s.isValid(':event/event', {
            ':event/type': ':event/search',
            ':search/url': 200
        })).to.be.false;
    });
});
