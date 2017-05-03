const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInt, isString} = s.utils;

describe('Test the multispec function', () => {
    before(() => {
        s.def(':event/type', isString);
        s.def(':event/timestamp', isInt);
        s.def(':search/url', isString);

        s.def(':error/message', isString);
        s.def(':error/code', isInt);        
    });

    xit('create a multispec', () => {
        const eventType = () => s.keys({req: [':event/type', ':event/timestamp', ':search/url']});

        defmethod(eventType, ':event/search', () => s.keys({req: [':event/type', ':event/timestamp', ':search/url']}));

        defmethod(eventType, ':event/error', () => s.keys({req: [':event/type', ':event/timestamp',
                                                                 ':error/message', ':error/code']}));

        s.def(':event/event', s.multiSpec(eventType, ':event/type'));

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
});
