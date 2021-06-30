var expect = require('chai').expect;
var getRoomMW = require('../../../../middleware/admin/room/getRoomMW');

describe('getRoom middleware ', function () {

    it('should set res.locals.room with a room object from db', function (done) {
        const mw = getRoomMW({
            RoomModel:{
                findOne: (param1, cb)=> {
                    expect(param1).to.be.eql({_id: '1'});
                    cb(null,'mockroom');
                }
            }
        });

        const resMock = {
            locals:{}
        };

        mw(
            {
                params:{
                    id: '1'
                }
            },
            resMock,
            (err)=> {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({room: 'mockroom'});
                done();
            }
        );
    });
    it('should call next with error when there is a problem with db', function (done) {
        const mw = getRoomMW({
            RoomModel:{
                findOne: (param1, cb)=> {
                    expect(param1).to.be.eql({_id: '1'});
                    cb('dbproblem', null);
                }
            }
        });

        const resMock = {
            locals:{}
        };

        mw(
            {
                params:{
                    id: '1'
                }
            },
            resMock,
            (err)=> {
                expect(err).to.be.eql('dbproblem');
                done();
            }
        );
    });
    it('should call next in case no room was found in the db', function (done) {
        const mw = getRoomMW({
            RoomModel:{
                findOne: (param1, cb)=> {
                    expect(param1).to.be.eql({_id: '1'});
                    cb(null, null);
                }
            }
        });

        const resMock = {
            locals:{}
        };

        mw(
            {
                params:{
                    id: '1'
                }
            },
            resMock,
            (err)=> {
                expect(err).to.be.eql(null);
                expect(resMock.locals).to.be.eql({});
                done();
            }
        );
    });

});
