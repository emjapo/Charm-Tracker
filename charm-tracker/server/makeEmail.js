function makeEmail() {
  if (Meteor.isClient) {
    Template.email.event({
      "submit #email-form": function (e, t) {
        e.preventDefault()
        var toAddr = "geraldwheaton2000@gmail.com" //t.find("#inputEmail")
        var subj = "Definitely not phishing" //t.find("#inputSubject")
        var body = "Wuts up NeeErrrRRRd" //t.find("#inputBody")
        Meteor.call("sendEmail", toAddr, subj, body)
      },
    })
  }

  if (Meteor.isServer) {
    Meteor.startup(function () {
      process.env.MAIL_URL =
        "smtp://postmaster@sandboxd7fdeb2dd07648928b006422e647c10d.mailgun.org:e5339fb85dcc027e938ae6f42004725f-0677517f-f029a2a2@smtp.mailgun.org:587"

      Account.emailTemplate.from = "no-reply@localhost3000.com"
      Account.emailTemplate.sitename = "LuckyCharms"
      Account.emailTemplate.verifyEmail.subject = function (user) {
        return "test email"
      }
      Account.emailTemplate.verifyEmail.text = function (user, url) {
        return "Click the following link. I promise its not phishing" + url
      }
      Account.config({
        sendVerificationEmail: true,
      })
    })

    Meteor.methods({
      sendEmail: function (to, subj, text) {
        this.unblock()

        Email.send({
          to: to,
          from: "no-reply@localhost3000.com",
          subject: subj,
          text: text,
        })
      },
    })
  }
}

export default makeEmail
