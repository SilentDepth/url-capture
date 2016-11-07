require('chai').should();

var makeArgs = require('./helper').makeArgs;

describe('arguments.js', function () {
  var parseArgs = require('../src/util/arguments');
  var result;

  it('script.js url1 output1', function () {
    result = parseArgs(makeArgs('script.js url1 output1'));
    result.urls.should.deep.equal(['url1']);
    result.output.should.equal('output1');
  });

  it('script.js url1 output1 -s', function () {
    result = parseArgs(makeArgs('script.js url1 output1 -s'));
    result.urls.should.deep.equal(['url1']);
    result.output.should.equal('output1');
    result.silent.should.equal(true);
  });

  it('script.js -u url1 url2 -o output1', function () {
    result = parseArgs(makeArgs('script.js -u url1 url2 -o output1'));
    result.urls.should.deep.equal(['url1', 'url2']);
    result.output.should.equal('output1');
  });

  it('script.js -f file1 -o output1', function () {
    result = parseArgs(makeArgs('script.js -f file1 -o output1'));
    result.file.should.equal('file1');
    result.output.should.equal('output1');
  });

  it('script.js url1 -o output1 output2 (-o has high priority)', function () {
    result = parseArgs(makeArgs('script.js url1 -o output1 output2'));
    result.urls.should.deep.equal(['url1']);
    result.output.should.equal('output1');
  });

  it('script.js url1 -u url2 url3 -o output1 (-u overrides implied url)', function () {
    result = parseArgs(makeArgs('script.js url1 -u url2 url3 -o output1'));
    result.urls.should.deep.equal(['url2', 'url3']);
    result.output.should.equal('output1');
  });
});