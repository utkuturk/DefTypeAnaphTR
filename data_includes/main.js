PennController.ResetPrefix(null);

PreloadZip(
  "https://files.lab.florianschwarz.net/ibexfiles/StimulusArchive/DefTypAnaphEN.zip"
);

//DebugOff()

Header().log("PROLIFIC_ID", GetURLParameter("id"));
// void

Sequence(
  "consent",
  "Start",
  "audtest",
  "counter",
  "Instructions",
  "preload",
  rshuffle("critical", "filler1", "filler2"),
  "Feedback",
  SendResults(),
  "end"
);

CheckPreloaded("critical", "filler1", "filler2").label("preload");

newTrial(
  "consent",
  newHtml("SonaConsent", "IbexConsentProlific2022.html").print().log(),
  newButton("Start", "I Consent").print().wait()
);

SetCounter("counter", "inc", 1);

newTrial(
  "Start",
  newText(
    "fullscreen",
    "Click on 'Start' to begin the experiment in fullscreen mode."
  )
    .center()
    .print(),
  newButton("start", "Start").center().print().wait(),
  fullscreen()
);

newTrial(
  "audtest",
  newText(
    "pleez",
    'Click on the "Play" button to make sure that you can hear audio playback in the experiment. ' +
      "You can play back the test recording as many times as needed."
  ).print(),
  newAudio("testsound", " Test.mp3").center().print().wait(),
  newButton("strt", "Continue").center().print().wait()
);

newTrial(
  "Instructions",

  newText(
    "Intro1",
    "<p>(To read on, press any key!!)</p>" +
      "<p>In this experiment, you are the assistant to a play in a simple game. In the game, " +
      "there are two players. Each round, six pictures will be laid out. Each player has to " +
      "collect pictures in particular categories. For this, they receive two category cards: " +
      "one for a general category (e.g., 'animals') and one for a more specific category " +
      "(e.g., 'fire truck'). In addition, before choosing a picture on their turn, they get " +
      "a third category card from a mixed stack, which can be general or specific. When it's " +
      "a player's turn, they must choose a picture that fits the categories they have as well as " +
      "possible. Pictures for specific categories count for more points. When a picture for " +
      "a given category has been selected, the category card is discarded (and replaced " +
      "next round).</p>"
  ).print(),
  newKey("space1", "").wait(),
  newText(
    "Intro2",
    "<p>Fortunately, you don't have to worry about the details of the rules of the game too much. " +
      "Your task is simply to help the player you are assisting and select the pictures " +
      "they are asking for by clicking on them.</p>"
  ).print(),
  newKey("space2", "").wait(),
  newText(
    "Intro3",
    "<p>You first see how the other player is making their choice, and an additional card " +
      "is removed.</p>"
  ).print(),
  defaultImage.size(1500, 350),
  newKey("space2b", "").wait(),
  newImage("Example", "Illustration1.jpg").print(),
  newTimer("Example1", 1000).start().wait(),
  getImage("Example").remove(),
  newImage("Example2", "Illustration2.jpg").print(),
  newTimer("Example2", 1000).start().wait(),
  getImage("Example2").remove(),
  newImage("Example3", "Illustration3.jpg").print(),
  // ,
  // newTimer("Example3", 1000)
  //     .start()
  //     .wait()
  newKey("space3", "").wait(),
  getImage("Example3").remove(),
  newText(
    "Intro4",
    "<p> While the other player is making their decision, you'll hear comments from your " +
      "player on the cards that are available. When it's your player's turn, new cards are " +
      "added, and your player will tell you which card to select for them by clicking on it.</p>"
  ).print(),

  newKey("space4", "").wait(),
  newText("Intro5", "<p>That's all - easy, and off we go!</p>").print(),
  newButton("Begin", "Start Experiment").print().wait()
);

Template((row) =>
  newTrial(
    row.Type,

    newCanvas("I1", 275, 150).add(
      "center at 50%",
      "middle at 50%",
      newImage("I1", row.I1)
        .size((row.I1_Width / row.I1_Height) * 150, 150)
        .hidden()
    ),
    newCanvas("I2", 275, 150)
      .add(
        "center at 50%",
        "middle at 50%",
        newImage("I2_2", row.I2_2)
          .size((row.I2_2_Width / row.I2_2_Height) * 150, 150)
          .hidden()
      )
      .add(
        "center at 50%",
        "middle at 50%",
        newImage("I2", row.I2)
          .size((row.I2_Width / row.I2_Height) * 150, 150)
          .hidden()
      ),
    newCanvas("I3", 275, 150).add(
      "center at 50%",
      "middle at 50%",
      newImage("I3", row.I3)
        .size((row.I3_Width / row.I3_Height) * 150, 150)
        .hidden()
    ),
    newCanvas("I4", 275, 150)
      .add(
        "center at 50%",
        "middle at 50%",
        newImage("I4_2", row.I4_2)
          .size((row.I4_2_Width / row.I4_2_Height) * 150, 150)
          .hidden()
      )
      .add(
        "center at 50%",
        "middle at 50%",
        newImage("I4", row.I4)
          .size((row.I4_Width / row.I4_Height) * 150, 150)
          .hidden()
      ),
    newCanvas("I5", 275, 150).add(
      "center at 50%",
      "middle at 50%",
      newImage("I5", row.I5)
        .size((row.I5_Width / row.I5_Height) * 150, 150)
        .hidden()
    ),
    newCanvas("I6", 275, 150).add(
      "center at 50%",
      "middle at 50%",
      newImage("I6", row.I6).size((row.I6_Width / row.I6_Height) * 150, 150)
    ),
    newCanvas("Display", 1500, 350)
      .add("center at 10.5%", "middle at 21.5%", getCanvas("I1"))
      .add("center at 48.5%", "middle at 21.5%", getCanvas("I2"))
      .add("center at 89.5%", "middle at 21.5%", getCanvas("I3"))
      .add("center at 10.5%", "middle at 78.5%", getCanvas("I4"))
      .add("center at 48.5%", "middle at 78.5%", getCanvas("I5"))
      .add("center at 89.5%", "middle at 78.5%", getCanvas("I6"))
      .print(),
    newSelector("Grid")
      .disableClicks()
      .add(getCanvas("I1"))
      .add(getCanvas("I2"))
      .add(getCanvas("I3"))
      .add(getCanvas("I4"))
      .add(getCanvas("I5"))
      .add(getCanvas("I6"))
      .shuffle()
      .frame("solid 5px red"),
    // ,
    // getCanvas("Display")
    //     .print()
    newTimer("TimerShuffle", 100).start().wait(),
    getImage("I1").visible(),
    getImage("I2").visible(),
    getImage("I3").visible(),
    getImage("I4").visible(),
    getImage("I5").visible(),
    getImage("I6").visible(),
    newTimer("TimerCon", 500).start().wait(),
    newAudio("Con", row.Con_file).play().wait(),
    newTimer("TimerGrid", 500).start().wait(),
    getSelector("Grid").enableClicks().select(getCanvas("I2")),

    newTimer("Timer1", 500).start().wait(),
    getImage("I2").hidden(),
    getImage("I4").hidden(),
    getSelector("Grid").unselect(getImage("I2")),
    newTimer("Timer2", 500).start().wait(),
    getImage("I2_2").visible(),
    getImage("I4_2").visible(),
    // getCanvas("Display")
    //     .remove()
    // //clear()
    // ,
    // newCanvas("Display2", 1500, 350)
    //     .add( "center at 10.5%" , "middle at 21.5%" , getImage("I1") )
    //     //.add( "center at 48.5%" , "middle at 21.5%" , getImage("I2") )
    //     .add( "center at 48.5%" , "middle at 21.5%" , getImage("I2_2").visible())
    //     .add( "center at 89.5%" , "middle at 21.5%" , getImage("I3") )
    //     //.add( "center at 10.5%" , "middle at 78.5%" , getImage("I4") )
    //     .add( "center at 10.5%" , "middle at 78.5%" , getImage("I4_2").visible())
    //     .add( "center at 48.5%" , "middle at 78.5%" , getImage("I5") )
    //     .add( "center at 89.5%" , "middle at 78.5%" , getImage("I6") )
    //     .print()
    // ,

    // newSelector("Grid2")
    //     .add(getImage("I1"))
    //     //.add(getImage("I2"))
    //     .add(getImage("I2_2"))
    //     .add(getImage("I3"))
    //     //.add(getImage("I4"))
    //     .add(getImage("I4_2"))
    //     .add(getImage("I5"))
    //     .add(getImage("I6"))
    //     .shuffle()
    //     .frame("solid 5px blue")
    // ,
    getSelector("Grid").frame("solid 5px blue"),
    // getCanvas("Display2")
    //     .print()
    newTimer("Timer3", 1000).start().wait(),
    newAudio("Sen", row.Sen_file).log().play(),
    //.wait()
    getSelector("Grid").log().wait(),
    getAudio("Sen").wait("first"),
    newTimer("End", 500).start().wait(),
    getCanvas("Display").remove(),
    newTimer("Transition", 500).start().wait()
  )
    .log("Item", row.Item)
    .log("Group", row.Group)
    .log("Type", row.Type)
    .log("Typ_Order", row.Typ_Order)
    .log("DefType", row.DefType)
    .log("Antecedent", row.Antecedent)
    .log("Ref", row.I2_2)
),
  newTrial(
    "Feedback",
    newTextInput(
      "Bemerkenswertes",
      "Was there anything in particular or something remarkable that you noticed, or do you have any other comments for us?"
    )
      .log()
      .lines(0)
      .size(600, 300)
      .print(),
    newTextInput(
      "Design",
      "Do you have any idea what the experiment was about?"
    )
      .log()
      .lines(0)
      .size(600, 300)
      .print(),
    newButton("Finish", "Send comments").print().wait()
  ),
  // Final screen
  newTrial(
    "end",
    newText("Thanks for your participation!").center().print(),
    // This link a placeholder: replace it with a URL provided by your participant-pooling platform
    newText(
      "<p><a href='https://app.prolific.co/submissions/complete?cc=23AAA8F2' target='_blank'>Click here to validate your submission on Prolific (necessary for payment!).</a></p>"
    )
      .center()
      .print(),
    newText(
      "<p>The link will open a new tab redirecting you to Prolific. After participation on Prolific has been confirmed, you may close the present window.</p>"
    )
      .center()
      .print(),

    // Trick: stay on this trial forever (until tab is closed)
    newButton().wait()
  );
