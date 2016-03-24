var path           = require('path')
var sampleDir   = path.join(__dirname, 'templates', 'sample')
var EmailTemplate = require('email-templates').EmailTemplate
var fs = require('fs-extra')
var async = require('async')
var slug = require('slug')

var sample = new EmailTemplate(sampleDir)

var tests = [
    {
        background: 'https://gallery.mailchimp.com/4ca7b1922d93f327ebc560d44/images/041b0b62-52c0-483f-a5e2-57bed9cad390.png',
        title: 'Done in 3, 2, 1!',
        subtitle: 'Power your marketing with user-generated content in 3 steps.',
        cta: 'Check it out'
    }
]

var outputDir = path.join(sampleDir, 'output')

fs.remove(outputDir, function (err) {
  if (err) return console.error(err)
  console.log('output folder removed')
})

async.each(tests, function (test, next) {
  sample.render(test, function (err, result) {
    if (err) return next(err)

    fs.outputFile(path.join(outputDir, slug(test.title + '.html')), result.html, function (err) {
      console.log(err || test.title) // => null
    })

  })
}, function (err) {
  console.log(err);
})
