PennController.ResetPrefix(null);
SetCounter("setcounter");
// PreloadZip("https://files.lab.florianschwarz.net/ibexfiles/StimulusArchive/DefTypAnaph.zip");

DebugOff();

var progressBarText = "Deney Süreci";
const PROGRESS_SIZE = { w: 300, h: 20 };

var pageCss = {
  overflow: "auto",
  padding: "1em",
  "box-shadow": "4px 4px 2px #cacfd2",
  border: "1px solid #cacfd2",
  "border-radius": "2em",
};

var textCss = {
  "text-align": "center",
  margin: "0 auto",
  // "width": "50em"
};

var buttonCss = {
  "background-color": "#E03A3E",
  color: "white",
  "font-size": "1.25em",
  padding: "0.5em",
  "border-radius": "0.25em",
  // "width": "4em",
  margin: "0 auto",
  "text-align": "center",
  border: "none", // Remove default button border
  display: "block", // To center the button
};

Header().log("PROLIFIC_ID", GetURLParameter("id")),

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
  newText(
    "consent-body",
    "<center><b>Deney Onay Formu</b></center>" +
      "<p>Lütfen <a target='_blank' rel='noopener noreferrer' href='https://utkuturk.com/web_consent_tr.pdf'>bu linke</a> tıklayarak onay formunu indirip inceleyiniz. Bu onay formunu okuyup bu çalışmaya katılmayı kabul ediyorsanız, aşağıdaki 'Kabul Ediyorum' butonuna tıklayın. Bu çalışmaya katılmayı kabul etmiyorsanız, sekmeyi kapatarak bu çalışmadan çıkabilirsiniz. Deney sırasında istediğiniz zaman sekmeyi kapatarak deneyden çıkabilirsiniz. Eğer deneyi tamamlamadan çıkarsanız, zamanınız için herhangi bir ödeme yapılmayacaktır. Herhangi bir sorunla karşılaşırsanız, lütfen bizimle e-posta yoluyla iletişime geçmekten çekinmeyin." +
      "<br><br><b> Araştırmacılar:</b> <br>Yağmur Sağ Parvardeh, University of Rutgers <i> (yagmur.sag@rutgers.edu)</i> <br>Dorothy Ahn, University of Rutgers"
  ),
  newCanvas("consent-page", 600, 400)
    .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
    .add(0, 150, getText("consent-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("agree", "Kabul Ediyorum").bold().css(buttonCss).print().wait()
);

SetCounter("counter", "inc", 1);

newTrial(
  "Start",
  newText("exp-start-title", "Deneye Başlamak İçin Hazır Mısınız?").bold(),
  newText(
    "exp-start-body",
    "<p>Devam etmeden önce, lütfen çok gürültü olmayan ve dikkatinizi toparlayabileceğiniz bir ortamda olduğunuzdan emin olun." +
      "<p>Hazır olduğunuzda 'Başla'ya basarak deneye başlayabilirsiniz. Otomatik olarak tam ekran moduna geçeceksiniz."
  ),
  newCanvas("start-page", 1500, 300)
    .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
    .add(0, 150, getText("exp-start-title"))
    .add(0, 180, getText("exp-start-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("Deneye başlamak için Tıklayınız")
    .bold()
    .css(buttonCss)
    .print()
    .wait(),
  fullscreen()
);

newTrial(
  "audtest",
  newText(
    "pleez",
    "'Oynat' düğmesine tıklayarak ses çalma işlevinin çalıştığını kontrol edin. Test sesini istediğiniz kadar tekrar tekrar  oynatabilirsiniz."
  ),
  newAudio("testsound", " Test.mp3").center(),
  newCanvas("start-page", 1500, 300)
    .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
    .add(0, 150, getText("pleez"))
    .add(300, 200, getAudio("testsound"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("Devam et")
    .bold()
    .css(buttonCss)
    .print()
    .wait(getAudio("testsound").test.hasPlayed().failure(newText("Lütfen devam etmeden önce sesi kontrol edin.")))
);



newTrial(
  "Instructions",

  newText(
    "Intro1",
    "<p>(Bir sonraki kısmı okumak için 'boşluk' tuşuna basınız!)</p>" +
      "<p>Bu çalışmada, basit bir oyunda  asistan rolünü oynayacaksınız. Oyunda iki oyuncu olacak. Her turda altı resim sunulacak. Her oyuncu kendilerine verilecek belirli kategorilerdeki resimleri toplamalıdır. Kategoriler, verilecek iki kategori kartı ile belirlenecek. Bu kart ya genel kategori kartı olabilir (örneğin 'hayvanlar') ya da spesifik bir kategori kartı olabilir (örneğin 'itfaiye aracı')." +
      "<p>Kendi sıralarında bir resim seçmeden önce, üçüncü bir kategoriden bir kart daha sunulacak. Bu üçüncü kategori karılmış bir desteden gelecek ve genel ya da spesifik bir kart olabilir. Sırası gelen oyuncu, elindeki kategorilere en uygun resmi seçmelidir. Spesifik kategoriden olan resimler daha fazla puan değerindedir. Verilen kategori kartı için resim seçildikten sonra, kategori kartı atılacak (ve sonraki turda yeni bir kart gelecektir)."
  ).print(),
  newKey("space1", " ").wait(),
  newText(
    "Intro2",
    "<p>Neyse ki, sizin oyunun kurallarıyla çok fazla ilgilenmenize gerek yok. Göreviniz sadece asistanı olduğunuz oyuncuya yardım etmek ve istedikleri resimleri tıklayarak seçmektir."
  ).print(),
  newKey("space2", "").wait(),
  newText(
    "Intro3",
    "<p>İlk olarak, diğer oyuncunun seçimini hangi yönde yapacağını göreceksiniz. Diğer oyuncunun seçimine ek olarak ekstra bir kart daha  atılacaktır.</p>"
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
  newKey("space3", " ").wait(),
  getImage("Example3").remove(),
  newText(
    "Intro4",
    "<p>Diğer oyuncu kararını verirken, asistanı olduğunuz oyuncudan  mevcut kartlar hakkında yorumlar duyacaksınız. Oyuncunuzun sırası geldiğinde, ortaya yeni kartlar eklenir ve oyuncunuz size hangi kartı seçeceğinizi söyleyecektir. <b>Sizden oyuncunuzun söylediği karta tıklamanız beklenmektedir.</b>"
  ).print(),

  newKey("space4", " ").wait(),
  newText(
    "Intro5",
    "<p>Oyunun talimatları bu kadar! Kolay gelsin, şansınız bol olsun!</p>"
  ).print(),
  newButton("Oyunu Başlatın!")
    .bold()
    .css(buttonCss)
    .print()
    .wait()
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


    getSelector("Grid").frame("solid 5px blue"),


    newTimer("Timer3", 1000).start().wait(),
    newAudio("Sen", row.Sen_file).log().play(),

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
      "Deney esnasında dikkanizi çeken bir şey oldu mu? Oyun hakkında bir yorumunuz var mı?"
    )
      .log()
      .lines(0)
      .size(600, 300)
      .print(),
    newTextInput(
      "Design",
      "Çalışmanın ne hakkında olduğu ile ilgili bir tahmininiz var mıydı? Eğer varsa, lütfen buraya yazınız."
    )
      .log()
      .lines(0)
      .size(600, 300)
      .print(),
    newButton("Yorumlarınızı gönderin!").bold().css(buttonCss).print().wait()
  ),
  // Final screen
  newTrial(
    "end",
    exitFullscreen(),
    newText("Katıldığınız için teşekkür ederiz!").center().print(),
    newText(
      "<p><a href='XXXXXX' target='_blank'>Katılımınızı Prolific'te onaylamak için buraya tıklayın!</a></p>"
    )
      .center()
      .print(),
    newText(
      "<p>Bu bağlantı yeni bir pencere açar ve sizi Prolific'e geri yönlendirir. Katılımınız Prolific'te onaylandıktan sonra, bu pencereyi kapatabilirsiniz.</p>"
    )
      .center()
      .print(),
    newButton().wait()
  );
