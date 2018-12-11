meSpeak.loadConfig("mespeak/mespeak_config.json");
meSpeak.loadVoice("mespeak/voices/la.json");
meSpeak.setDefaultVoice("la");
meSpeak.speak("lo:tium repo:ne:ba:tur in co:leo:rum; lo:tium repo:ne:ba:tur in co:leo:rum; ple:ne: inde:pende:ns luxurio:sus cinaedus caelestis commu:nismus; societa:tem habita:mus; tibi gratias ago: pro: adventu; pro:move:, responde:, subsequere", {
  pitch: 25,
  speed: 200,
  voice: "la",
  variant: "whisperf"
});
