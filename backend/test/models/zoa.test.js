const mongoose = require('mongoose'); 
let Zoa = require('../../models/zoa');
var chai = require('chai');
var expect = chai.expect;

// dummy region for the zoas
const zoa = new Zoa({
    name: "mohamed",
    hours: 12,
    available: true,

});

describe("Zoa model test", () => {
    // connect to db and clear before all tests
    before(async () => {
        await mongoose.connect("mongodb://localhost:27017/zoa_test", {
            useNewUrlParser: true,
            useFindAndModify: false
        });

        await Zoa.deleteMany({});
    });

    // clear after each test
    afterEach(async () => {
        await Zoa.deleteMany({});
    });

    // close the mongoose server
    after(async () => {
        await mongoose.disconnect();
    });

    it("has a module", () => {
        expect(Zoa).to.not.be.undefined;
    });

    describe("get zoa", () => {
        it("gets a zoa", async () => {
            const testzoa = new Zoa({
                name: "moh",
                hours: 23,
            });
            await testzoa.save();

            const foundzoa = await Zoa.findOne({ hours: 23});
            const expected = 23;
            const actual = foundzoa.hours;
            expect(actual).to.equal(expected);
        });
    });

    describe("save zoa", () => {
        it("saves a zoa", async () => {
            const testzoa = new Zoa({
                name: "moh",
                hours: 23,
            });
            const savedzoa = await testzoa.save();
            const expected = 23;
            const actual = savedzoa.hours;
            expect(actual).to.equal(expected);
        });
    });

    describe("update zoa", () => {
        it("updates a zoa", async () => {
            const testzoa = new Zoa({
                name: "moh",
                hours: 23
            });
            await testzoa.save();

            testzoa.hours = 23;
            const updatedzoa = await testzoa.save();

            const expected = 23;
            const actual = updatedzoa.hours;
            expect(actual).to.equal(expected);
        });
    });
});
