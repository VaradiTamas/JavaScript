var expect = require('chai').expect;
var updateReservationMW = require('../../../../middleware/admin/reservation/updateReservationMW');

describe('updateReservation middleware ', function () {
    it('should redirect to /admin/reservations', function (done) {

        const mw = updateReservationMW({});

        mw(
            {
                body: {
                    firstName: 'vezetek',
                    lastName: 'kereszt'
                }
            },
            {
                locals: {
                    reservation: {
                        firstName: 'vezetek',
                        lastName: 'kereszt',
                        email: 'a@g.com',
                        tel: '10101',
                        from: '2010-10-10',
                        to: '1010-10-10',
                        _room: '123',
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: where => {
                    expect(where).to.be.eql('/admin/reservations');
                    done();
                }
            },
            (err) => {
                // nincs next hívás
            }
        );
    });
    it('should call next with error if there is a problem with db', function (done) {

        const mw = updateReservationMW({});

        mw(
            {
                body: {
                    firstName: 'vezetek',
                    lastName: 'kereszt'
                }
            },
            {
                locals: {
                    reservation: {
                        firstName: 'vezetek',
                        lastName: 'kereszt',
                        email: 'a@g.com',
                        tel: '10101',
                        from: '2010-10-10',
                        to: '1010-10-10',
                        _room: '123',
                        save: (cb) => {
                            cb('dberror');
                        }
                    }
                },
                redirect: where => {
                }
            },
            (err) => {
                expect(err).to.be.eql('dberror');
                done();
            }
        );
    });
    it('should call next if lastName is undefined', function (done) {

        const mw = updateReservationMW({});
        var nehivd = false;

        const mockLocal = {
            locals: {
                reservation:{
                    save(cb){
                        nehivd = true;
                        cb(null);
                    }
                }
            },
            redirect: where => {
            }
        };

        mw(
            {
                body: {
                    firstName: 'vezetek'
                }
            },
            mockLocal,
            (err) => {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            }
        );
    });
    it('should call next if firstName is undefined', function (done) {

        const mw = updateReservationMW({});
        var nehivd = false;

        const mockLocal = {
            locals: {
                reservation:{
                    save(cb){
                        nehivd = true;
                        cb(null);
                    }
                }
            },
            redirect: where => {
            }
        };

        mw(
            {
                body: {
                    lastName: 'vezetek'
                }
            },
            mockLocal,
            (err) => {
                expect(nehivd).to.be.eql(false);
                expect(err).to.eql(undefined);
                done();
            }
        );
    });
});
