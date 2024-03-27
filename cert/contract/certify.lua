Members = Members or {}

Handlers.add(
    "Register",
    Handlers.utils.hasMatchingTag("Action", "Register"),
    function (msg)
      table.insert(Members, msg.From)
      Handlers.utils.reply("registered")(msg)
    end
  )