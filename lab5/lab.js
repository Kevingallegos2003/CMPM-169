/**
 * @author Kate
 */

var verbs = ["accept", "allow", "ask", "believe", "borrow", "break", "bring", "buy", "can”,”be able", "cancel", "change", "clean", "comb", "complain", "cough", "count", "cut", "dance", "draw", "drink", "drive", "eat", "explain", "fall", "fill", "find", "finish", "fit", "fix", "fly", "forget", "give", "go", "have", "hear", "hurt", "know", "learn", "leave", "listen", "live", "look", "lose", "make”,”do", "need", "open", "close", "shut", "organise", "pay", "play", "put", "rain", "read", "reply", "run", "say", "see", "sell", "send", "sign", "sing", "sit", "sleep", "smoke", "speak", "spell", "spend", "stand", "start”,”begin", "study", "succeed", "swim", "take", "talk", "teach", "tell", "think", "translate", "travel", "try", "turn off", "turn on", "type", "understand", "use", "wait", "wake up", "want", "watch", "work", "worry", "write"];



var ruleGrammar = tracery.createGrammar({
		
	"move":["flock", "race", "glide", "dance", "flee", "lie"],
	"bird":["swan", "heron", "sparrow", "swallow", "wren", "robin"],
	"agent":["cloud", "wave", "#bird#", "boat", "ship"],
	"transVerb":["forget", "plant", "greet", "remember", "embrace", "feel", "love"],
	"emotion":["sorrow", "gladness", "joy", "heartache", "love", "forgiveness", "grace"],
	"substance":["#emotion#", "mist", "fog", "glass", "silver", "rain", "dew", "cloud", "virtue", "sun", "shadow", "gold", "light", "darkness"],
	"adj":["fair", "bright", "splendid", "divine", "inseparable", "fine", "lazy", "grand", "slow", "quick", "graceful", "grave", "clear", "faint", "dreary"],
	"doThing":["come", "move", "cry", "weep", "laugh", "dream"],
	"verb":["fleck", "grace", "bless", "dapple", "touch", "caress", "smooth", "crown", "veil"],
	"ground":["glen", "river", "vale", "sea", "meadow", "forest", "glade", "grass", "sky", "waves"],
	"poeticAdj":["#substance#-#verb.ed#"],
	"poeticDesc":["#poeticAdj#", "by #substance# #verb#'d", "#adj# with #substance#", "#verb.ed# with #substance#"],
	"ah":["ah", "alas", "oh", "yet", "but", "and"],
	"on":["on", "in", "above", "beneath", "under", "by"],
	"punctutation":[",", ":", " ", "!", ".", "?"],
	"noun":["#ground#", "#agent#"],
	"line":["My #noun#, #poeticDesc#, my #adj# one", "More #adj# than #noun# #poeticDesc#", "#move.capitalize# with me #on# #poeticAdj# #ground#", "The #agent.s# #move#, #adj# and #adj#", "#poeticDesc.capitalize#, #poeticDesc#, #ah#, #poeticDesc#", "How #adj# is the #poeticDesc# #sub#", "#poeticDesc.capitalize# with #emotion#, #transVerb.s# the #noun#"],
	"poem":["#line##punctutation##line##punctutation##line##punctutation##line#."],
	"origin":["#[sub:#noun#]poem#"]
});
var poem = ruleGrammar.flatten("#poem#");
console.log(poem);