(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/0-config.js
  var TIMING = Object.freeze({
    UI: {
      START_UI_REVEAL: 1500,
      BLACKOUT_TIMER: 200,
      BLACKOUT_WAIT_TO_REVEAL: 50
    },
    VIDEO: {
      VID_END_TIMER: 1500
    }
  });
  var ASSETS = Object.freeze({
    "view-1": {
      desktop: "https://cdn.prod.website-files.com/61e77b1e3ddfc76b6fe81446/69d6b6f5903fe11ad9dae0c6_Comps%20View-Start%20Shot%20(with%20comps).webp",
      mobile: "https://cdn.prod.website-files.com/61e77b1e3ddfc76b6fe81446/69d92e32e453b551eee2b623_Comps%20View-Start%20Shot-MP%20(with%20comps).webp"
    }
  });
  var VIEW_START_END = Object.freeze({
    "view-1": {
      startTime: 0,
      endTime: 0
    }
  });
  var LOOP_SEQUENCE_VIDS = true;

  // src/0-global.js
  var global_exports = {};
  __export(global_exports, {
    _state: () => _state,
    activateCurrentBtn: () => activateCurrentBtn,
    activateCurrentNavLink: () => activateCurrentNavLink,
    allNavMenuLinks: () => allNavMenuLinks,
    allSections: () => allSections,
    allVidCodes: () => allVidCodes,
    allVids: () => allVids,
    blackout: () => blackout,
    clearSectionVidSrc: () => clearSectionVidSrc,
    deactivateAllCtrlBtnWrappers: () => deactivateAllCtrlBtnWrappers,
    deactivateAllSections: () => deactivateAllSections,
    deactivateCurrentBtns: () => deactivateCurrentBtns,
    deactivateCurrentNavLinks: () => deactivateCurrentNavLinks,
    disablePause: () => disablePause,
    disableSectionCtrlBtnEvents: () => disableSectionCtrlBtnEvents,
    enableNavLinksAndNavBtn: () => enableNavLinksAndNavBtn,
    enablePause: () => enablePause,
    enableSectionCtrlBtnEvents: () => enableSectionCtrlBtnEvents,
    flashBlackout: () => flashBlackout,
    getActiveVid: () => getActiveVid,
    getLocalIndex: () => getLocalIndex,
    getVidType: () => getVidType,
    getWebflowBreakpoint: () => getWebflowBreakpoint,
    mainWrapper: () => mainWrapper,
    navBtn: () => navBtn,
    navMenu: () => navMenu,
    playRange: () => playRange,
    query: () => query,
    queryAll: () => queryAll,
    resetAllSectionVids: () => resetAllSectionVids,
    setActiveCtrlBtnWrapper: () => setActiveCtrlBtnWrapper,
    setActiveSection: () => setActiveSection,
    setActiveVid: () => setActiveVid,
    setEndTime: () => setEndTime,
    setStartTime: () => setStartTime,
    setWebflowBreakpoint: () => setWebflowBreakpoint,
    toggleBtnHoverClass: () => toggleBtnHoverClass,
    togglePause: () => togglePause
  });
  var mainWrapper = document.querySelector(".main-wrapper");
  var blackout = document.querySelector(".blackout");
  var allSections = [...document.querySelectorAll(".section")];
  var allVidCodes = document.querySelectorAll(".vid-code");
  var allVids = document.querySelectorAll(".vid");
  var navMenu = document.querySelector(".nav_menu");
  var allNavMenuLinks = document.querySelectorAll(".nav_menu_link");
  var navBtn = document.querySelector(".nav_button");
  var _state = {
    activeSection: null,
    activeSectionName: null,
    activeVid: null,
    webflowBreakpoint: null,
    startTime: 0,
    endTime: 0,
    pauseFlag: false
  };
  var query = function(selector, context = document) {
    const el = context.querySelector(selector);
    if (!el) {
      throw new Error(
        `CRITICAL UI ERROR: "${selector}" is missing from the DOM.`
      );
    }
    return el;
  };
  var queryAll = function(selector, context = document) {
    const elements = context.querySelectorAll(selector);
    if (elements.length === 0) {
      throw new Error(
        `CRITICAL UI ERROR: No elements matching "${selector}" found.`
      );
    }
    return elements;
  };
  var getVidType = function(video) {
    return video.closest(".section").classList[1];
  };
  var flashBlackout = function() {
    blackout.classList.add("active");
    setTimeout(function() {
      blackout.classList.remove("active");
    }, TIMING.UI.BLACKOUT_TIMER);
  };
  var enableNavLinksAndNavBtn = function() {
    navMenu.style.pointerEvents = "auto";
    navBtn.style.pointerEvents = "auto";
  };
  var activateCurrentNavLink = function(clicked) {
    deactivateCurrentNavLinks();
    clicked.classList.add("current");
  };
  var deactivateCurrentNavLinks = function() {
    allNavMenuLinks.forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var setActiveSection = function(sectionName, index) {
    deactivateAllSections();
    _state.activeSectionName = sectionName;
    if (!index) index = 0;
    const matches = allSections.filter(
      (el) => el.dataset.section === sectionName
    );
    const target = matches[index];
    if (target) {
      target.classList.add("active");
      _state.activeSection = target;
    }
  };
  var deactivateAllSections = function() {
    allSections.forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var getActiveVid = function() {
    return _state.activeVid;
  };
  var setActiveVid = function(activeVidWrap, activeSequenceStep) {
    if (_state.activeVid) {
      _state.activeVid.pause();
      _state.activeVid.src = "";
    }
    if (activeVidWrap && activeSequenceStep === null) {
      activeVidWrap.querySelectorAll(".vid-code").forEach((el) => {
        if (el.querySelector(".vid").offsetParent !== null) {
          _state.activeVid = el.querySelector(".vid");
        }
      });
    } else if (activeVidWrap && activeSequenceStep) {
      _state.activeVid = activeSequenceStep;
    } else {
      allVidCodes.forEach((el) => {
        if (el.querySelector(".vid").offsetParent !== null) {
          _state.activeVid = el.querySelector(".vid");
        }
      });
    }
  };
  var getWebflowBreakpoint = function() {
    return _state.webflowBreakpoint;
  };
  var setWebflowBreakpoint = function() {
    const width = window.innerWidth;
    if (width < 480) _state.webflowBreakpoint = "mobilePortrait";
    if (width >= 480) _state.webflowBreakpoint = "mobileLandscape";
    if (width >= 768) _state.webflowBreakpoint = "tablet";
    if (width >= 992) _state.webflowBreakpoint = "desktop";
  };
  var setStartTime = function(newValue) {
    _state.startTime = newValue;
  };
  var setEndTime = function(newValue) {
    _state.endTime = newValue;
  };
  var clearSectionVidSrc = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.src = "";
      el.load();
    });
  };
  var resetAllSectionVids = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.currentTime = 0;
      el.pause();
    });
  };
  var playRange = function(videoCurrentTime) {
    if (!_state.activeVid) return;
    const vidCode = _state.activeVid.parentElement;
    const targetStart = videoCurrentTime || _state.startTime;
    if (_state.activeVid._currentMonitor) {
      _state.activeVid.removeEventListener(
        "timeupdate",
        _state.activeVid._currentMonitor
      );
    }
    if (vidCode) vidCode.style.opacity = "0";
    _state.activeVid.removeEventListener(
      "timeupdate",
      _state.activeVid._currentMonitor
    );
    const monitorTime = () => {
      if (_state.activeVid.currentTime >= _state.endTime - 0.15) {
        _state.activeVid.removeEventListener("timeupdate", monitorTime);
        _state.activeVid.pause();
        _state.activeVid.currentTime = _state.endTime;
        _state.activeVid.dispatchEvent(new Event("ended"));
      }
    };
    _state.activeVid._currentMonitor = monitorTime;
    const source = _state.activeVid.querySelector("source");
    const dataSrc = source ? source.getAttribute("data-src") : null;
    if (dataSrc && _state.activeVid.src !== dataSrc) {
      _state.activeVid.pause();
      _state.activeVid.src = dataSrc;
      _state.activeVid.load();
    }
    const startPlaybackSequence = async () => {
      try {
        _state.activeVid.currentTime = targetStart;
        const pollForFrame = () => {
          if (_state.activeVid.currentTime > targetStart) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (vidCode) vidCode.style.opacity = "1";
                if (typeof blackout !== "undefined")
                  blackout.classList.remove("active");
              });
            });
          } else if (!_state.activeVid.paused) {
            requestAnimationFrame(pollForFrame);
          }
        };
        _state.activeVid.addEventListener("timeupdate", monitorTime);
        await _state.activeVid.play();
        pollForFrame();
      } catch (e) {
        console.warn("Playback failed:", e);
        if (vidCode) vidCode.style.opacity = "1";
      }
    };
    if (_state.activeVid.readyState >= 3) {
      startPlaybackSequence();
    } else {
      _state.activeVid.addEventListener("canplay", startPlaybackSequence, {
        once: true
      });
    }
  };
  var disablePause = function() {
    _state.pauseFlag = false;
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "none";
  };
  var enablePause = function() {
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "auto";
  };
  var togglePause = function() {
    if (_state.pauseFlag) {
      _state.pauseFlag = false;
      _state.activeVid.play();
    } else {
      _state.pauseFlag = true;
      _state.activeVid.pause();
    }
  };
  var enableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "auto";
  };
  var disableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "none";
  };
  var setActiveCtrlBtnWrapper = function(btnWrapperIndex) {
    deactivateAllCtrlBtnWrappers();
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el, index) {
      if (index === btnWrapperIndex) {
        el.classList.add("active");
      }
    });
  };
  var deactivateAllCtrlBtnWrappers = function() {
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var toggleBtnHoverClass = function(btn) {
    if (_state.activeVid && _state.webflowBreakpoint === "desktop")
      btn.classList.toggle("hovered");
  };
  var activateCurrentBtn = function(btn) {
    deactivateCurrentBtns();
    setTimeout(() => {
      btn.classList.add("current");
    }, 50);
  };
  var deactivateCurrentBtns = function(section) {
    if (!section) section = _state.activeSection;
    section.querySelectorAll(".ctrl-btn").forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var getLocalIndex = function(btn, btnClass, allBtnsWrapper) {
    let localIndex;
    const allBtns = btn.closest(`.${allBtnsWrapper}`).querySelectorAll(`.${btnClass}`);
    allBtns.forEach(function(el, index) {
      if (el === btn) localIndex = index;
    });
    return localIndex;
  };

  // src/0-navbar.js
  var Navbar = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.navMenu = this.global.query(".nav_menu", this.container);
      this.navBtn = this.global.query(".nav_button", this.container);
      this.allNavLinks = this.global.queryAll(".nav_menu_link", this.container);
      this.allNavLinksWithDropdown = [
        ...this.global.queryAll('[data-nav-section="sequence"]', this.container)
      ];
      this.allNavDropdowns = [
        ...this.global.queryAll(".nav_menu_dropdown", this.container)
      ];
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-nav-dropdown", this.openNavDropdown],
        ["close-nav-dropdown", this.closeNavDropdown],
        ["toggle-nav-dropdown", this.toggleNavDropdown]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    handleEvent = function(trigger, eventAction) {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    closeNavMenu = function() {
      this.allNavDropdowns.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    closeMobileNavMenu = function() {
      if ("navMenuOpen" in this.navMenu.dataset) this.navBtn.click();
      this.navMenu.querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    openNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.add("active");
    };
    closeNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    toggleNavDropdown = function(trigger) {
      this.global.activateCurrentNavLink(trigger);
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.toggle("active");
    };
  };
  var navbar_default = Navbar;

  // src/1-features.js
  var Features = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.featuresBlackout = this.global.query(".blackout", this.container);
      this.featuresAllText = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.featuresAllVidWraps = [
        ...this.global.queryAll(".vid-wrap", this.container)
      ];
      this.featuresIntroVidDiv = this.global.query(
        ".vid-wrap.intro",
        this.container
      );
      this.featuresVidDiv = this.global.query(
        ".vid-wrap.features",
        this.container
      );
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.featuresCtrlBtns = this.global.query(
        ".section-wrap-btns",
        this.container
      );
      this.activeFeature = null;
      this.activeVidWrap = null;
      this.featuresTimer = null;
      this.featuresEndisCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-features", this.initSection],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked, isIntro2) => {
      this.global.blackout.classList.remove("active");
      this.featuresBlackout.classList.remove("active");
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      if (clicked) {
        this.global.activateCurrentNavLink(clicked);
        this.global.flashBlackout();
      }
      this.global.enableSectionCtrlBtnEvents();
      this.hideAllText();
      this.showIntroText();
      this.featuresCtrlBtns.classList.add("active");
      if (isIntro2) return;
      this.playFeaturesIntro();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    hideAllText = () => {
      this.featuresAllText.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showIntroText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === "intro").classList.add("active");
    };
    showFeatureText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === this.activeFeature).classList.add("active");
    };
    showFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.add("active");
    };
    hideFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.remove("active");
    };
    showFeaturesVidDiv = (feature) => {
      this.featuresAllVidWraps.forEach((el) => {
        if (el.classList.contains("intro")) return;
        el.classList.remove("active");
        if (el.dataset.feature === feature) {
          this.acitveVidWrap = el;
          this.acitveVidWrap.classList.add("active");
        }
      });
    };
    hideFeaturesVidDiv = () => {
      this.featuresAllVidWraps.forEach((el) => {
        if (el.classList.contains("intro")) return;
        el.classList.remove("active");
      });
    };
    playFeaturesIntro = () => {
      this.featuresBlackout.classList.remove("active");
      this.showFeaturesIntroVidDiv();
      this.hideFeaturesVidDiv();
      const allIntros = this.featuresIntroVidDiv.querySelectorAll(".vid-code-intro");
      allIntros.forEach((el) => {
        if (el.offsetParent !== null) {
          const vid = el.querySelector(".vid-intro");
          if (vid) {
            vid.currentTime = 0;
            vid.play();
          }
        }
      });
    };
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearFeaturesTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.hideFeaturesIntroVidDiv();
      this.showFeaturesVidDiv(clickedCtrlBtn.dataset.feature);
      this.activeFeature = clickedCtrlBtn.dataset.feature;
      this.featuresEndisCancelled = false;
      this.hideAllText();
      this.showFeatureText();
      this.global.setActiveVid(this.acitveVidWrap, null);
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.featuresEndisCancelled === false) {
        this.global.disableSectionCtrlBtnEvents();
        this.global.disablePause();
        this.pauseWrapper.classList.remove("active");
        this.featuresTimer = setTimeout(() => {
          this.featuresBlackout.classList.add("active");
          setTimeout(() => {
            this.hideAllText();
            this.showIntroText();
            this.global.resetAllSectionVids();
            this.global.deactivateCurrentBtns();
            this.global.enableNavLinksAndNavBtn();
            this.global.enableSectionCtrlBtnEvents();
            this.playFeaturesIntro();
          }, TIMING.UI.BLACKOUT_WAIT_TO_REVEAL);
        }, TIMING.VIDEO.VID_END_TIMER);
      }
    };
    clearFeaturesTimers = () => {
      this.featuresEndisCancelled = true;
      clearTimeout(this.featuresTimer);
      this.featuresTimer = null;
    };
  };
  var features_default = Features;

  // src/2-data.js
  var HOME_VIEW = "view-1";
  var Data = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.introText = this.global.query(".section-wrap-txt", this.container);
      this.viewOptsBtn = this.global.query(".opts-menu-btn", this.container);
      this.viewOptsMenu = this.global.query(".opts-dropdown", this.container);
      this.allViewOptBtns = [
        ...this.global.queryAll(".opts-menu-link", this.container)
      ];
      this.dimmer = this.global.query(".dimmer", this.container);
      this.txtImgBtn = this.global.query(".txt-img-btn", this.container);
      this.activeDataWrapper = this.global.query(
        ".section-wrap-comp-data",
        this.container
      );
      this.allDataWrappers = [
        ...this.global.queryAll(".section-wrap-comp-data", this.container)
      ];
      this.allData = [...this.global.queryAll(".comp-data-wrap", this.container)];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.activeViewBtn = null;
      this.activeView = "view-1";
      this.lastActiveView = { view: "view-1", startTime: 0, endTime: 0 };
      this.viewVidFlag = false;
      this.viewChainFlag = false;
      this.txtOrImg = "image";
      this.activeDataSheet = null;
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[0];
      this.startTime = 0;
      this.endTime = 0;
      this.activeCtrlBtn = null;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-data", this.initSection],
        ["play-ctrl-vid", this.setAndPlayCtrlBtnVid],
        ["play-view-vid", this.setAndPlayViewVid],
        ["back-to-view", this.backToViewFromComp],
        ["open-view-opts-menu", this.showViewOptsMenu],
        ["close-view-opts-menu", this.hideViewOptsMenu],
        ["toggle-img-txt", this.showCompImageOrText],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
      this.assetsMap = /* @__PURE__ */ new Map([
        ["view-1", ASSETS["view-1"].desktop],
        ["view-1-mp", ASSETS["view-1"].mobile]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
      this.global.flashBlackout();
      this.dimmer.classList.remove("active");
      this.txtOrImg = "image";
      this.txtImgBtn.textContent = "image";
      this.hideBackBtn();
      this.hideAllData();
      this.resetAllDataSheets();
      this.introText.classList.add("active");
      this.showCtrlBtnWrapper();
      this.global.activateCurrentNavLink(clicked);
      this.global.clearSectionVidSrc();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    showViewOptsMenu = () => {
      this.viewOptsMenu.classList.add("active");
    };
    hideViewOptsMenu = () => {
      this.viewOptsMenu.classList.remove("active");
    };
    showCompImageOrText = () => {
      if (this.txtOrImg === "image") {
        this.txtOrImg = "text";
        this.dimmer.classList.remove("active");
        this.activeDataSheet.classList.remove("active");
      } else {
        this.txtOrImg = "image";
        this.dimmer.classList.add("active");
        this.activeDataSheet.classList.add("active");
      }
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = this.txtOrImg;
    };
    hideAllData = () => {
      this.deactivateAllDataWrappers();
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showData = () => {
      this.activeDataWrapper.classList.add("active");
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach((el) => {
        if (el.dataset.comp === this.activeCtrlBtn.dataset.comp)
          this.activeDataSheet = el;
      });
      this.activeDataSheet.classList.add("active");
    };
    hideBackBtn = () => {
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.remove("active");
    };
    showBackBtn = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach(function(el) {
        el.classList.remove("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.add("active");
    };
    resetAllDataSheets = () => {
      this.allData.forEach(function(el) {
        el.parentElement.classList.add("active");
        el.querySelector(".comp-data-body-wrap").scroll(0, 0);
        el.parentElement.classList.remove("active");
      });
    };
    setLastActiveView = (newValue) => {
      if (!newValue) {
        this.lastActiveView.view = this.activeView;
      } else {
        this.lastActiveView.view = newValue;
      }
    };
    setActiveView = () => {
      this.activeView = this.activeViewBtn.dataset.view;
    };
    viewBackToStart = () => {
      this.startTime = VIEW_START_END[this.lastActiveView.view].startTime;
      this.endTime = VIEW_START_END[this.lastActiveView.view].endTime;
    };
    setViewVidStartAndEnd = () => {
      this.viewVidFlag = true;
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView === HOME_VIEW) {
        this.viewBackToStart();
        return;
      }
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView !== HOME_VIEW) {
        this.viewChainFlag = true;
        this.viewBackToStart();
        return;
      }
      this.startTime = this.activeViewBtn.dataset.startTime;
      this.endTime = this.activeViewBtn.dataset.endTime;
    };
    setDataVidStartAndEnd = () => {
      this.viewVidFlag = false;
      this.hideAllData();
      this.startTime = this.activeCtrlBtn.dataset.startTime;
      this.endTime = this.activeCtrlBtn.dataset.endTime;
    };
    setDataVidPoster = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      let mapKey = this.activeView;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVid.setAttribute("poster", asset);
    };
    setDataVidBackgroundImg = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      const activeVidWrap = activeVid.closest(".vid-wrap");
      let mapKey = this.lastActiveView.view;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVidWrap.style.backgroundImage = `url("${asset}")`;
    };
    deactivateAllDataWrappers = () => {
      this.allDataWrappers.forEach((el) => {
        el.classList.remove("active");
      });
    };
    setAndPlayViewVid = (clickedViewOptsBtn) => {
      if (clickedViewOptsBtn.dataset.view === this.activeView) return;
      this.viewOptsMenu.classList.remove("active");
      this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
      this.activeDataWrapper = this.allDataWrappers.find(
        (el) => el.dataset.view === clickedViewOptsBtn.dataset.view
      );
      this.activeViewBtn = clickedViewOptsBtn;
      this.global.setActiveVid();
      this.setDataVidBackgroundImg();
      this.setActiveView();
      this.setActiveCtrlBtnWrapper();
      this.setViewVidStartAndEnd();
      this.playDataVid();
    };
    setAndPlayCtrlBtnVid = (clickedCtrlBtn) => {
      this.global.setActiveVid();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
      this.hideActiveCtrlBtnWrapper();
      this.activeCtrlBtn = clickedCtrlBtn;
      this.setDataVidStartAndEnd(this.activeCtrlBtn);
      this.playDataVid();
    };
    playDataVid = () => {
      this.introText.classList.remove("active");
      this.activeCtrlBtnWrapper.classList.remove("active");
      this.global.setStartTime(this.startTime);
      this.global.setEndTime(this.endTime);
      this.global.playRange();
    };
    vidEnd = () => {
      this.dimmer.classList.add("active");
      this.activeDataWrapper.querySelector(".txt-img-btn").classList.add("active");
      this.showData();
      this.showBackBtn();
      const activeVidWrap = this.global.getActiveVid().closest(".vid-wrap");
      if (activeVidWrap) {
        activeVidWrap.style.backgroundImage = "none";
        activeVidWrap.style.backgroundColor = "black";
      }
    };
    backToViewFromComp = () => {
      this.global.flashBlackout();
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
      this.txtOrImg = "image";
      this.activeDataWrapper.querySelector(".txt-img-btn").classList.remove("active");
      this.hideAllData();
      this.resetAllDataSheets();
      this.dimmer.classList.remove("active");
      this.introText.classList.add("active");
      this.hideBackBtn();
      this.showCtrlBtnWrapper();
      this.setDataVidBackgroundImg();
      this.global.clearSectionVidSrc();
    };
    hideActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.remove("active");
    };
    showActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    showCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach((el) => {
        el.classList.add("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    setActiveCtrlBtnWrapper = () => {
      this.global.deactivateAllCtrlBtnWrappers();
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.view === this.activeView
      );
    };
    deactivateAllCtrlBtnWrappers = () => {
      this.allCtrlBtnWrappers.forEach((el) => {
        el.classList.remove("active");
      });
    };
  };
  var data_default = Data;

  // src/3-sequence.js
  var Sequence = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.allTxtWrappers = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.allIntroTxt = [
        ...this.global.queryAll(".intro-txt-wrap", this.container)
      ];
      this.allActionHeadings = [
        ...this.global.queryAll(".action-heading", this.container)
      ];
      this.allVidWrappers = [
        ...this.global.queryAll(".vid-wrap", this.container)
      ];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.isDropdown = false;
      this.activeSequence = null;
      this.activeSectionTxt = null;
      this.activeVidWrapper = null;
      this.activeSequenceStep = null;
      this.allActiveSequenceSteps = null;
      this.activeCtrlBtnWrapper = null;
      this.sequenceTimer = null;
      this.sequenceEndIsCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-sequence", this.initSection],
        ["open-sequence-index", this.setActiveSequenceDropdown],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
      this.global.flashBlackout();
      this.activeSequence = clicked.dataset.sequence;
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      this.hideAllIntroText();
      this.hideAllActionHeadings();
      this.setAndShowActiveTxtWrapper();
      this.setAndShowActiveVidWrapper();
      this.allActiveSequenceSteps = /* @__PURE__ */ new Set();
      const steps = this.activeVidWrapper.querySelectorAll(".vid-code");
      steps.forEach((el) => {
        this.allActiveSequenceSteps.add(el.dataset.step);
      });
      this.setAndShowActiveCtrlBtnWrapper();
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.add("active");
      if (!this.isDropdown) {
        this.global.activateCurrentNavLink(clicked);
      } else {
        this.global.activateCurrentNavLink(
          clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
        );
        window.dispatchEvent(
          new CustomEvent("dropdownOptClicked", { detail: clicked })
        );
        this.isDropdown = false;
      }
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    setActiveSequenceDropdown = (clicked) => {
      if ("isDropdownIcon" in clicked.dataset) {
        window.dispatchEvent(
          new CustomEvent("dropdownIconClicked", { detail: clicked })
        );
      } else {
        this.isDropdown = true;
        this.initSection(clicked);
      }
    };
    setAndShowActiveTxtWrapper = () => {
      this.allTxtWrappers.forEach((el) => el.classList.remove("active"));
      this.activeTxtWrapper = this.allTxtWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeTxtWrapper.classList.add("active");
    };
    setAndShowActiveVidWrapper = () => {
      this.allVidWrappers.forEach(function(el) {
        el.classList.remove("active");
        el.querySelectorAll(".vid-code").forEach(function(el2) {
          el2.classList.remove("active");
        });
      });
      this.activeVidWrapper = this.allVidWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeVidWrapper.classList.add("active");
    };
    setActiveSequenceStep = (sequenceStepData) => {
      this.activeVidWrapper.querySelectorAll(".vid-code").forEach((el) => {
        if (el.dataset.step === sequenceStepData) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
        if (el.classList.contains("active") && el.offsetParent !== null)
          this.activeSequenceStep = el.querySelector(".vid");
      });
    };
    setAndShowActiveCtrlBtnWrapper = () => {
      this.allCtrlBtnWrappers.forEach((el) => el.classList.remove("active"));
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    hideAllIntroText = () => {
      this.allIntroTxt.forEach((el) => {
        el.classList.remove("active");
      });
    };
    hideAllActionHeadings = () => {
      this.allActionHeadings.forEach((el) => {
        el.classList.remove("active");
      });
    };
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearSequenceTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.remove("active");
      this.activeTxtWrapper.querySelector(".action-heading").classList.add("active");
      this.sequenceEndIsCancelled = false;
      this.setActiveSequenceStep(clickedCtrlBtn.dataset.step);
      this.global.setActiveVid(this.activeVidWrapper, this.activeSequenceStep);
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.sequenceEndIsCancelled === false) {
        this.pauseWrapper.classList.remove("active");
        this.global.disablePause(this.pauseWrapper);
        this.global.deactivateCurrentBtns();
        if (LOOP_SEQUENCE_VIDS) {
          let activeStepIndex = [...this.allActiveSequenceSteps].indexOf(
            this.activeSequenceStep.parentElement.dataset.step
          );
          if (activeStepIndex === this.allActiveSequenceSteps.size - 1)
            activeStepIndex = 0;
          else {
            activeStepIndex += 1;
          }
          const nextStepBtn = [
            ...this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn")
          ].find(
            (el) => el.dataset.step === [...this.allActiveSequenceSteps][activeStepIndex]
          );
          setTimeout(() => {
            this.playCtrlBtnVid(nextStepBtn);
          }, 200);
        }
      }
    };
    clearSequenceTimers = () => {
      this.sequenceEndIsCancelled = true;
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    };
  };
  var sequence_default = Sequence;

  // src/main.js
  console.log("May 28, 2026");
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
  var navContainer = query(".nav_component", document);
  var featuresContainer = query(".section.features", document);
  var dataContainer = query(".section.data", document);
  var sequenceContainer = query(".section.sequence", document);
  var navbar = new navbar_default(global_exports, navContainer);
  var features = new features_default(global_exports, featuresContainer);
  var data = new data_default(global_exports, dataContainer);
  var sequence = new sequence_default(global_exports, sequenceContainer);
  var SECTIONS = {
    navbar,
    features,
    data,
    sequence
  };
  navContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection = clicked.dataset.navSection;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    if ("isDropdownIcon" in clicked.dataset) {
      targetModule.handleEvent(clicked, action);
      return;
    }
    blackout.classList.add("active");
    setActiveSection(activeSection);
    targetModule.handleEvent(clicked, action);
  });
  navContainer.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const action = hovered.dataset.mouseoverAction;
    navbar.handleEvent(hovered, action);
  });
  navContainer.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const action = hovered.dataset.mouseoutAction;
    navbar.handleEvent(hovered, action);
  });
  window.addEventListener("dropdownIconClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.toggleNavDropdown(clicked);
  });
  window.addEventListener("dropdownOptClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.closeNavDropdown(clicked);
    navbar.closeMobileNavMenu();
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection = clicked.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    targetModule.handleEvent(clicked, action);
  });
  mainWrapper.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = hovered.dataset.mouseoverAction;
    targetModule.handleEvent(hovered, action);
  });
  mainWrapper.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = hovered.dataset.mouseoutAction;
    targetModule.handleEvent(hovered, action);
  });
  allVids.forEach(function(el) {
    el.addEventListener("ended", function(e) {
      const endedVid = e.target.closest(".vid");
      if (!endedVid) return;
      const vidSection = endedVid.closest(".section").dataset.section;
      const targetModule = SECTIONS[vidSection];
      targetModule.vidEnd();
    });
  });
  var init = function() {
    setupLazyLoading();
    setWebflowBreakpoint();
    blackout.classList.add("active");
    navContainer.classList.remove("active");
    navbar.allNavDropdowns.forEach(function(el) {
      el.classList.remove("active");
    });
    setActiveSection("features");
    setActiveVid();
    blackout.classList.remove("active");
    features.playFeaturesIntro();
    setTimeout(() => {
      navContainer.classList.add("active");
      features.initSection(null, isIntro = true);
    }, TIMING.UI.START_UI_REVEAL);
  };
  var setupLazyLoading = function() {
    const allLazyVids = document.querySelectorAll(".vid");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const sources = video.querySelectorAll("source");
        if (entry.isIntersecting) {
          sources.forEach((source) => {
            const dataSrc = source.getAttribute("data-src") || source.src;
            if (dataSrc) {
              source.src = dataSrc;
              source.setAttribute("data-src", dataSrc);
            }
          });
          video.load();
        } else {
          performance.clearMeasures();
          performance.clearResourceTimings();
          performance.clearMarks();
          ResetSection(video.closest(".section"));
          video.pause();
          sources.forEach((source) => {
            const currentSrc = source.src;
            if (currentSrc) {
              source.setAttribute("data-src", currentSrc);
              source.src = "";
              source.removeAttribute("src");
            }
          });
          video.load();
        }
      });
    }, observerOptions);
    allLazyVids.forEach((vid) => videoObserver.observe(vid));
    const ResetSection = function(section) {
      if (!section) return;
      section.querySelectorAll(".vid").forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
      deactivateCurrentBtns(section);
    };
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjFlNzdiMWUzZGRmYzc2YjZmZTgxNDQ2LzY5ZDZiNmY1OTAzZmUxMWFkOWRhZTBjNl9Db21wcyUyMFZpZXctU3RhcnQlMjBTaG90JTIwKHdpdGglMjBjb21wcykud2VicFwiLFxyXG4gICAgbW9iaWxlOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjFlNzdiMWUzZGRmYzc2YjZmZTgxNDQ2LzY5ZDkyZTMyZTQ1M2I1NTFlZWUyYjYyM19Db21wcyUyMFZpZXctU3RhcnQlMjBTaG90LU1QJTIwKHdpdGglMjBjb21wcykud2VicFwiLFxyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgVklFV19TVEFSVF9FTkQgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBzdGFydFRpbWU6IDAsXHJcbiAgICBlbmRUaW1lOiAwLFxyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgTE9PUF9TRVFVRU5DRV9WSURTID0gdHJ1ZTtcclxuIiwgImltcG9ydCB7IFRJTUlORyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5leHBvcnQgY29uc3QgbWFpbldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4td3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJsYWNrb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFja291dFwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFNlY3Rpb25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKV07XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRDb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbmV4cG9ydCBjb25zdCBuYXZNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbE5hdk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuZXhwb3J0IGNvbnN0IG5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKTtcclxuZXhwb3J0IGNvbnN0IF9zdGF0ZSA9IHtcclxuICBhY3RpdmVTZWN0aW9uOiBudWxsLFxyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lOiBudWxsLFxyXG4gIGFjdGl2ZVZpZDogbnVsbCxcclxuICB3ZWJmbG93QnJlYWtwb2ludDogbnVsbCxcclxuICBzdGFydFRpbWU6IDAsXHJcbiAgZW5kVGltZTogMCxcclxuICBwYXVzZUZsYWc6IGZhbHNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vR0xPQkFMIEZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9UaGUgJ1N0cmljdCcgU2VsZWN0b3JcclxuZXhwb3J0IGNvbnN0IHF1ZXJ5ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jdW1lbnQpIHtcclxuICBjb25zdCBlbCA9IGNvbnRleHQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgaWYgKCFlbCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgQ1JJVElDQUwgVUkgRVJST1I6IFwiJHtzZWxlY3Rvcn1cIiBpcyBtaXNzaW5nIGZyb20gdGhlIERPTS5gLFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG4vL1RoZSAnU3RyaWN0JyBNdWx0LVNlbGVjdG9yXHJcbmV4cG9ydCBjb25zdCBxdWVyeUFsbCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSB7XHJcbiAgY29uc3QgZWxlbWVudHMgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYENSSVRJQ0FMIFVJIEVSUk9SOiBObyBlbGVtZW50cyBtYXRjaGluZyBcIiR7c2VsZWN0b3J9XCIgZm91bmQuYCxcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBlbGVtZW50cztcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldFZpZFR5cGUgPSBmdW5jdGlvbiAodmlkZW8pIHtcclxuICByZXR1cm4gdmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpLmNsYXNzTGlzdFsxXTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGZsYXNoQmxhY2tvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSwgVElNSU5HLlVJLkJMQUNLT1VUX1RJTUVSKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuID0gZnVuY3Rpb24gKCkge1xyXG4gIG5hdk1lbnUuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG4gIG5hdkJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnROYXZMaW5rID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzKCk7XHJcbiAgY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWxsTmF2TWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbk5hbWUsIGluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zKCk7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVTZWN0aW9uID0gdGFyZ2V0O1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVBbGxTZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxTZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLmFjdGl2ZVZpZDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVZpZCA9IGZ1bmN0aW9uIChhY3RpdmVWaWRXcmFwLCBhY3RpdmVTZXF1ZW5jZVN0ZXApIHtcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZCkge1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5zcmMgPSBcIlwiO1xyXG4gIH1cclxuICBpZiAoYWN0aXZlVmlkV3JhcCAmJiBhY3RpdmVTZXF1ZW5jZVN0ZXAgPT09IG51bGwpIHtcclxuICAgIGFjdGl2ZVZpZFdyYXAucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIikub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgX3N0YXRlLmFjdGl2ZVZpZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9IGVsc2UgaWYgKGFjdGl2ZVZpZFdyYXAgJiYgYWN0aXZlU2VxdWVuY2VTdGVwKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkID0gYWN0aXZlU2VxdWVuY2VTdGVwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIikub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgX3N0YXRlLmFjdGl2ZVZpZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRXZWJmbG93QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLndlYmZsb3dCcmVha3BvaW50O1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0V2ViZmxvd0JyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICBpZiAod2lkdGggPCA0ODApIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwibW9iaWxlUG9ydHJhaXRcIjtcclxuICBpZiAod2lkdGggPj0gNDgwKSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcIm1vYmlsZUxhbmRzY2FwZVwiO1xyXG4gIGlmICh3aWR0aCA+PSA3NjgpIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwidGFibGV0XCI7XHJcbiAgaWYgKHdpZHRoID49IDk5MikgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJkZXNrdG9wXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRTdGFydFRpbWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICBfc3RhdGUuc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRFbmRUaW1lID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgX3N0YXRlLmVuZFRpbWUgPSBuZXdWYWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuc3JjID0gXCJcIjtcclxuICAgIGVsLmxvYWQoKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlc2V0QWxsU2VjdGlvblZpZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgIGVsLnBhdXNlKCk7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBwbGF5UmFuZ2UgPSBmdW5jdGlvbiAodmlkZW9DdXJyZW50VGltZSkge1xyXG4gIGlmICghX3N0YXRlLmFjdGl2ZVZpZCkgcmV0dXJuO1xyXG4gIGNvbnN0IHZpZENvZGUgPSBfc3RhdGUuYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IF9zdGF0ZS5zdGFydFRpbWU7XHJcbiAgLy8gQ0xFQU5VUDogS2lsbCBhbnkgcHJldmlvdXMgbW9uaXRvciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwidGltZXVwZGF0ZVwiLFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICAgICk7XHJcbiAgfVxyXG4gIC8vIDEuIEhJRERFTiBTVEFURTogSW5zdGFudCBoaWRlIHRvIHJldmVhbCB2aWQtd3JhcCBiYWNrZ3JvdW5kIGltYWdlXHJcbiAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgXCJ0aW1ldXBkYXRlXCIsXHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICApO1xyXG4gIGNvbnN0IG1vbml0b3JUaW1lID0gKCkgPT4ge1xyXG4gICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gX3N0YXRlLmVuZFRpbWUgLSAwLjE1KSB7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgbW9uaXRvclRpbWUpO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPSBfc3RhdGUuZW5kVGltZTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yID0gbW9uaXRvclRpbWU7XHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gX3N0YXRlLmFjdGl2ZVZpZC5xdWVyeVNlbGVjdG9yKFwic291cmNlXCIpO1xyXG4gIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UgPyBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgOiBudWxsO1xyXG4gIGlmIChkYXRhU3JjICYmIF9zdGF0ZS5hY3RpdmVWaWQuc3JjICE9PSBkYXRhU3JjKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnNyYyA9IGRhdGFTcmM7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmxvYWQoKTtcclxuICB9XHJcbiAgY29uc3Qgc3RhcnRQbGF5YmFja1NlcXVlbmNlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IHRhcmdldFN0YXJ0O1xyXG4gICAgICAvLyAyLiBUSEUgRkFJTC1TQUZFIFJFVkVBTFxyXG4gICAgICAvLyBXZSBwb2xsIGZvciBwaHlzaWNhbCBwbGF5aGVhZCBtb3ZlbWVudC4gT25jZSBpdCBtb3ZlcyxcclxuICAgICAgLy8gdGhlIFwiYmxhY2sgYnVmZmVyXCIgaXMgZ3VhcmFudGVlZCB0byBiZSBnb25lLlxyXG4gICAgICBjb25zdCBwb2xsRm9yRnJhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPiB0YXJnZXRTdGFydCkge1xyXG4gICAgICAgICAgLy8gRG91YmxlIFJBRiBpcyB0aGUgZmluYWwgZ3VhcmQgZm9yIHRoZSBHUFUgcGFpbnQgY3ljbGVcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxhY2tvdXQgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIV9zdGF0ZS5hY3RpdmVWaWQucGF1c2VkKSB7XHJcbiAgICAgICAgICAvLyBJZiBzdGlsbCBhdCB0YXJnZXRTdGFydCBidXQgcGxheWluZywgY2hlY2sgYWdhaW4gbmV4dCBmcmFtZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBvbGxGb3JGcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICAvLyAzLiBTVEFSVFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYXdhaXQgX3N0YXRlLmFjdGl2ZVZpZC5wbGF5KCk7XHJcbiAgICAgIHBvbGxGb3JGcmFtZSgpOyAvLyBTdGFydCBjaGVja2luZyBmb3IgdGhlIGZpcnN0IHJlYWwgZnJhbWVcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiUGxheWJhY2sgZmFpbGVkOlwiLCBlKTtcclxuICAgICAgLy8gRmFsbGJhY2s6IHNob3cgdmlkZW8gYW55d2F5IGlmIHBsYXkoKSBmYWlscyAoZS5nLiBhdXRwbGF5IGJsb2NrZWQpXHJcbiAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH1cclxuICB9O1xyXG4gIC8vIFdhaXQgZm9yIGRhdGEgKHJlYWR5U3RhdGUgMyBpcyBIQVZFX0ZVVFVSRV9EQVRBKVxyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkLnJlYWR5U3RhdGUgPj0gMykge1xyXG4gICAgc3RhcnRQbGF5YmFja1NlcXVlbmNlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIiwgc3RhcnRQbGF5YmFja1NlcXVlbmNlLCB7XHJcbiAgICAgIG9uY2U6IHRydWUsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLnBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIucGF1c2Utd3JhcFwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB0b2dnbGVQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAoX3N0YXRlLnBhdXNlRmxhZykge1xyXG4gICAgX3N0YXRlLnBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wbGF5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9zdGF0ZS5wYXVzZUZsYWcgPSB0cnVlO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRpc2FibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uIChidG5XcmFwcGVySW5kZXgpIHtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZUJ0bkhvdmVyQ2xhc3MgPSBmdW5jdGlvbiAoYnRuKSB7XHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQgJiYgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID09PSBcImRlc2t0b3BcIilcclxuICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiaG92ZXJlZFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudEJ0biA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxuICB9LCA1MCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudEJ0bnMgPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gIGlmICghc2VjdGlvbikgc2VjdGlvbiA9IF9zdGF0ZS5hY3RpdmVTZWN0aW9uO1xyXG4gIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRMb2NhbEluZGV4ID0gZnVuY3Rpb24gKGJ0biwgYnRuQ2xhc3MsIGFsbEJ0bnNXcmFwcGVyKSB7XHJcbiAgbGV0IGxvY2FsSW5kZXg7XHJcbiAgY29uc3QgYWxsQnRucyA9IGJ0blxyXG4gICAgLmNsb3Nlc3QoYC4ke2FsbEJ0bnNXcmFwcGVyfWApXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7YnRuQ2xhc3N9YCk7XHJcbiAgYWxsQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgIGlmIChlbCA9PT0gYnRuKSBsb2NhbEluZGV4ID0gaW5kZXg7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGxvY2FsSW5kZXg7XHJcbn07XHJcbiIsICJjbGFzcyBOYXZiYXIge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLm5hdk1lbnUgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5uYXZfbWVudVwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLm5hdkJ0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm5hdl9idXR0b25cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rcyA9IHRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm5hdl9tZW51X2xpbmtcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rc1dpdGhEcm9wZG93biA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoJ1tkYXRhLW5hdi1zZWN0aW9uPVwic2VxdWVuY2VcIl0nLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxOYXZEcm9wZG93bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tbmF2LWRyb3Bkb3duXCIsIHRoaXMub3Blbk5hdkRyb3Bkb3duXSxcclxuICAgICAgW1wiY2xvc2UtbmF2LWRyb3Bkb3duXCIsIHRoaXMuY2xvc2VOYXZEcm9wZG93bl0sXHJcbiAgICAgIFtcInRvZ2dsZS1uYXYtZHJvcGRvd25cIiwgdGhpcy50b2dnbGVOYXZEcm9wZG93bl0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBoYW5kbGVFdmVudCA9IGZ1bmN0aW9uICh0cmlnZ2VyLCBldmVudEFjdGlvbikge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbG9zZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbG9zZU1vYmlsZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoXCJuYXZNZW51T3BlblwiIGluIHRoaXMubmF2TWVudS5kYXRhc2V0KSB0aGlzLm5hdkJ0bi5jbGljaygpO1xyXG4gICAgdGhpcy5uYXZNZW51LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIG9wZW5OYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0cmlnZ2VyXHJcbiAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGNsb3NlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB0b2dnbGVOYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKHRyaWdnZXIpO1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZXMge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5ibGFja291dFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dCA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIudHh0LXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIudmlkLXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdiA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi52aWQtd3JhcC5pbnRyb1wiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2ID0gdGhpcy5nbG9iYWwucXVlcnkoXHJcbiAgICAgIFwiLnZpZC13cmFwLmZlYXR1cmVzXCIsXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5nbG9iYWwucXVlcnkoXCIucGF1c2Utd3JhcFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIuc2VjdGlvbi13cmFwLWJ0bnNcIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVGZWF0dXJlID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcCA9IG51bGw7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZmVhdHVyZXNcIiwgdGhpcy5pbml0U2VjdGlvbl0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZF0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkXSxcclxuICAgICAgW1wiYnRuLWhvdmVyZWRcIiwgdGhpcy5nbG9iYWwudG9nZ2xlQnRuSG92ZXJDbGFzcy5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gKGNsaWNrZWQsIGlzSW50cm8pID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIGlmIChjbGlja2VkKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgaWYgKGlzSW50cm8pIHJldHVybjtcclxuICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhpZGVBbGxUZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0ludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gXCJpbnRyb1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVGZWF0dXJlKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc0ludHJvVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNJbnRyb1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzVmlkRGl2ID0gKGZlYXR1cmUpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW50cm9cIikpIHJldHVybjtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQuZmVhdHVyZSA9PT0gZmVhdHVyZSkge1xyXG4gICAgICAgIHRoaXMuYWNpdHZlVmlkV3JhcCA9IGVsO1xyXG4gICAgICAgIHRoaXMuYWNpdHZlVmlkV3JhcC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW50cm9cIikpIHJldHVybjtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUZlYXR1cmVzSW50cm8gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzVmlkRGl2KCk7XHJcbiAgICAvLyBMb2dpYzogRmluZCB0aGUgb25lIHRoYXQgaXNuJ3QgaGlkZGVuIChkaXNwbGF5OiBub25lKVxyXG4gICAgY29uc3QgYWxsSW50cm9zID1cclxuICAgICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGUtaW50cm9cIik7XHJcbiAgICBhbGxJbnRyb3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgLy8gb2Zmc2V0UGFyZW50IGlzIG51bGwgaWYgdGhlIGVsZW1lbnQgaXMgZGlzcGxheTogbm9uZVxyXG4gICAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgdmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWQtaW50cm9cIik7XHJcbiAgICAgICAgaWYgKHZpZCkge1xyXG4gICAgICAgICAgdmlkLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgIHZpZC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZXNUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc1ZpZERpdihjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmZlYXR1cmUpO1xyXG4gICAgdGhpcy5hY3RpdmVGZWF0dXJlID0gY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5mZWF0dXJlO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlVGV4dCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKHRoaXMuYWNpdHZlVmlkV3JhcCwgbnVsbCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwucmVzZXRBbGxTZWN0aW9uVmlkcygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAgICAgICB9LCBUSU1JTkcuVUkuQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwpO1xyXG4gICAgICB9LCBUSU1JTkcuVklERU8uVklEX0VORF9USU1FUik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbGVhckZlYXR1cmVzVGltZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZlYXR1cmVzVGltZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVzO1xyXG4iLCAiaW1wb3J0IHsgQVNTRVRTLCBWSUVXX1NUQVJUX0VORCB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbmNvbnN0IEhPTUVfVklFVyA9IFwidmlldy0xXCI7XHJcbmNsYXNzIERhdGEge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmludHJvVGV4dCA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24td3JhcC10eHRcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm9wdHMtbWVudS1idG5cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5vcHRzLWRyb3Bkb3duXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsVmlld09wdEJ0bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm9wdHMtbWVudS1saW5rXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmRpbW1lciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLmRpbW1lclwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnR4dC1pbWctYnRuXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxEYXRhID0gWy4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLmNvbXAtZGF0YS13cmFwXCIsIHRoaXMuY29udGFpbmVyKV07XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSBcInZpZXctMVwiO1xyXG4gICAgdGhpcy5sYXN0QWN0aXZlVmlldyA9IHsgdmlldzogXCJ2aWV3LTFcIiwgc3RhcnRUaW1lOiAwLCBlbmRUaW1lOiAwIH07XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLnZpZXdDaGFpbkZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnNbMF07XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSAwO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1kYXRhXCIsIHRoaXMuaW5pdFNlY3Rpb25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMuc2V0QW5kUGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwbGF5LXZpZXctdmlkXCIsIHRoaXMuc2V0QW5kUGxheVZpZXdWaWRdLFxyXG4gICAgICBbXCJiYWNrLXRvLXZpZXdcIiwgdGhpcy5iYWNrVG9WaWV3RnJvbUNvbXBdLFxyXG4gICAgICBbXCJvcGVuLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuc2hvd1ZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcImNsb3NlLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuaGlkZVZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcInRvZ2dsZS1pbWctdHh0XCIsIHRoaXMuc2hvd0NvbXBJbWFnZU9yVGV4dF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICAgIHRoaXMuYXNzZXRzTWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcInZpZXctMVwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0uZGVza3RvcF0sXHJcbiAgICAgIFtcInZpZXctMS1tcFwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0ubW9iaWxlXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gKGNsaWNrZWQpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRJbWdCdG4udGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIGJja2dybmQgaW1nXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzaG93Vmlld09wdHNNZW51ID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVWaWV3T3B0c01lbnUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0NvbXBJbWFnZU9yVGV4dCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnR4dE9ySW1nID09PSBcImltYWdlXCIpIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwidGV4dFwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHh0T3JJbWc7XHJcbiAgfTtcclxuICBoaWRlQWxsRGF0YSA9ICgpID0+IHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUFsbERhdGFXcmFwcGVycygpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG4gIHNob3dEYXRhID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5kYXRhc2V0LmNvbXAgPT09IHRoaXMuYWN0aXZlQ3RybEJ0bi5kYXRhc2V0LmNvbXApXHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQgPSBlbDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVCYWNrQnRuID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0JhY2tCdG4gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcmVzZXRBbGxEYXRhU2hlZXRzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxEYXRhLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5jb21wLWRhdGEtYm9keS13cmFwXCIpLnNjcm9sbCgwLCAwKTtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRMYXN0QWN0aXZlVmlldyA9IChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVZpZXcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC52aWV3O1xyXG4gIH07XHJcbiAgdmlld0JhY2tUb1N0YXJ0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IFZJRVdfU1RBUlRfRU5EW3RoaXMubGFzdEFjdGl2ZVZpZXcudmlld10uZW5kVGltZTtcclxuICB9O1xyXG4gIHNldFZpZXdWaWRTdGFydEFuZEVuZCA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgIT09IEhPTUVfVklFVyAmJlxyXG4gICAgICB0aGlzLmFjdGl2ZVZpZXcgPT09IEhPTUVfVklFV1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMudmlld0JhY2tUb1N0YXJ0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ICE9PSBIT01FX1ZJRVcgJiZcclxuICAgICAgdGhpcy5hY3RpdmVWaWV3ICE9PSBIT01FX1ZJRVdcclxuICAgICkge1xyXG4gICAgICB0aGlzLnZpZXdDaGFpbkZsYWcgPSB0cnVlO1xyXG4gICAgICB0aGlzLnZpZXdCYWNrVG9TdGFydCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuYWN0aXZlVmlld0J0bi5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuYWN0aXZlVmlld0J0bi5kYXRhc2V0LmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXREYXRhVmlkU3RhcnRBbmRFbmQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuYWN0aXZlQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuYWN0aXZlQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXREYXRhVmlkUG9zdGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWN0aXZlVmlkID0gdGhpcy5nbG9iYWwuZ2V0QWN0aXZlVmlkKCk7XHJcbiAgICBpZiAoIWFjdGl2ZVZpZCkgcmV0dXJuO1xyXG4gICAgbGV0IG1hcEtleSA9IHRoaXMuYWN0aXZlVmlldztcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkgbWFwS2V5ICs9IFwiLW1wXCI7XHJcbiAgICBjb25zdCBhc3NldCA9IHRoaXMuYXNzZXRzTWFwLmdldChtYXBLZXkpO1xyXG4gICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBhc3NldCk7XHJcbiAgfTtcclxuICBzZXREYXRhVmlkQmFja2dyb3VuZEltZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpO1xyXG4gICAgaWYgKCFhY3RpdmVWaWQpIHJldHVybjtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSBhY3RpdmVWaWQuY2xvc2VzdChcIi52aWQtd3JhcFwiKTtcclxuICAgIGxldCBtYXBLZXkgPSB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXc7XHJcbiAgICBpZiAoYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXBcIikpIG1hcEtleSArPSBcIi1tcFwiO1xyXG4gICAgY29uc3QgYXNzZXQgPSB0aGlzLmFzc2V0c01hcC5nZXQobWFwS2V5KTtcclxuICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7YXNzZXR9XCIpYDtcclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRQbGF5Vmlld1ZpZCA9IChjbGlja2VkVmlld09wdHNCdG4pID0+IHtcclxuICAgIC8vcmV0dXJuIGlmIGNsaWNrZWQgdmlldyBzYW1lIGFzIGN1cnJlbnQgdmlld1xyXG4gICAgaWYgKGNsaWNrZWRWaWV3T3B0c0J0bi5kYXRhc2V0LnZpZXcgPT09IHRoaXMuYWN0aXZlVmlldykgcmV0dXJuO1xyXG4gICAgLy9zZXR0aW5nIFVJIGFuZCBsb2dpYy4uLlxyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMudmlld09wdHNCdG4udGV4dENvbnRlbnQgPSBjbGlja2VkVmlld09wdHNCdG4udGV4dENvbnRlbnQ7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyID0gdGhpcy5hbGxEYXRhV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnZpZXcgPT09IGNsaWNrZWRWaWV3T3B0c0J0bi5kYXRhc2V0LnZpZXcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3QnRuID0gY2xpY2tlZFZpZXdPcHRzQnRuO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlVmlldygpOyAvL2ZvciB0aGUgcG9zdGVyXHJcbiAgICB0aGlzLnNldEFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICAvL3BsYXkgdmlkXHJcbiAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheUN0cmxCdG5WaWQgPSAoY2xpY2tlZEN0cmxCdG4pID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciB0aGUgYmNrZ3JuZCBpbWcgdG8gY2hhbmdlIHRvIGNvbXAgdmlkIHN0YXJ0c1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5oaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0biA9IGNsaWNrZWRDdHJsQnRuO1xyXG4gICAgLy9wbGF5XHJcbiAgICB0aGlzLnNldERhdGFWaWRTdGFydEFuZEVuZCh0aGlzLmFjdGl2ZUN0cmxCdG4pO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpOyAvL3JlbW92ZXMgYmxhY2tvdXQgaW4gZ2xvYmFsLnBsYXlSYW5nZVxyXG4gIH07XHJcbiAgcGxheURhdGFWaWQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKHRoaXMuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUodGhpcy5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgLy8gaWYgKHRoaXMudmlld1ZpZEZsYWcgJiYgIXRoaXMudmlld0NoYWluRmxhZykge1xyXG4gICAgLy8gICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7XHJcbiAgICAvLyAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIC8vICAgdGhpcy5zZXREYXRhVmlkUG9zdGVyKCk7IC8vZG9uZSBoZXJlIHNvIHBvc3RlciBkb2Vzbid0IGFwcGVhciBlYXJsaWVyXHJcbiAgICAvLyAgIHRoaXMuc2hvd0FjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICAvLyAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAvLyAgIHRoaXMuZ2xvYmFsLmVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuKCk7XHJcbiAgICAvLyB9IGVsc2UgaWYgKHRoaXMudmlld0NoYWluRmxhZykge1xyXG4gICAgLy8gICB0aGlzLnZpZXdDaGFpbkZsYWcgPSBmYWxzZTtcclxuICAgIC8vICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldyhIT01FX1ZJRVcpO1xyXG4gICAgLy8gICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAvLyAgIHRoaXMuc2V0Vmlld1ZpZFN0YXJ0QW5kRW5kKCk7XHJcbiAgICAvLyAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIHRoaXMuc2hvd0JhY2tCdG4oKTtcclxuICAgIC8vc2V0IGJja2dybmQgaW1nIHRvIGJsYWNrIHRvIHByZXZlbnQgZmxhc2ggb2YgaW1hZ2Ugd2hlbiBjaGFuZ2luZyBuYXZcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKS5jbG9zZXN0KFwiLnZpZC13cmFwXCIpO1xyXG4gICAgaWYgKGFjdGl2ZVZpZFdyYXApIHtcclxuICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIm5vbmVcIjtcclxuICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICB9XHJcbiAgICAvLyB9XHJcbiAgfTtcclxuICBiYWNrVG9WaWV3RnJvbUNvbXAgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUJhY2tCdG4oKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcblxyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgfTtcclxuICBoaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93Q3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnZpZXcgPT09IHRoaXMuYWN0aXZlVmlldyxcclxuICAgICk7XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGF0YTtcclxuIiwgImltcG9ydCB7IExPT1BfU0VRVUVOQ0VfVklEUyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcblxyXG5jbGFzcyBTZXF1ZW5jZSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5nbG9iYWwucXVlcnkoXCIucGF1c2Utd3JhcFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmFsbFR4dFdyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi50eHQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxJbnRyb1R4dCA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuaW50cm8tdHh0LXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLmFjdGlvbi1oZWFkaW5nXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi52aWQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmlzRHJvcGRvd24gPSBmYWxzZTtcclxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2UgPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVTZWN0aW9uVHh0ID0gbnVsbDtcclxuICAgIC8vIHRoaXMuY3VycmVudFZpZFdyYXBwZXIgPSBcInNlcXVlbmNlLTFcIjtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlciA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlU3RlcCA9IG51bGw7XHJcbiAgICB0aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHMgPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tc2VxdWVuY2VcIiwgdGhpcy5pbml0U2VjdGlvbl0sXHJcbiAgICAgIFtcIm9wZW4tc2VxdWVuY2UtaW5kZXhcIiwgdGhpcy5zZXRBY3RpdmVTZXF1ZW5jZURyb3Bkb3duXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnBsYXlDdHJsQnRuVmlkXSxcclxuICAgICAgW1wicGF1c2UtY3RybC12aWRcIiwgdGhpcy5wYXVzZUN0cmxWaWRdLFxyXG4gICAgICBbXCJidG4taG92ZXJlZFwiLCB0aGlzLmdsb2JhbC50b2dnbGVCdG5Ib3ZlckNsYXNzLmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSAoY2xpY2tlZCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IGNsaWNrZWQuZGF0YXNldC5zZXF1ZW5jZTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuaGlkZUFsbEludHJvVGV4dCgpO1xyXG4gICAgdGhpcy5oaWRlQWxsQWN0aW9uSGVhZGluZ3MoKTtcclxuICAgIHRoaXMuc2V0QW5kU2hvd0FjdGl2ZVR4dFdyYXBwZXIoKTtcclxuICAgIHRoaXMuc2V0QW5kU2hvd0FjdGl2ZVZpZFdyYXBwZXIoKTtcclxuICAgIHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcyA9IG5ldyBTZXQoKTtcclxuICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5hY3RpdmVWaWRXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbiAgICBzdGVwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICB0aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHMuYWRkKGVsLmRhdGFzZXQuc3RlcCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2V0QW5kU2hvd0FjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuaW50cm8tdHh0LXdyYXBcIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBpZiAoIXRoaXMuaXNEcm9wZG93bikge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhcclxuICAgICAgICBjbGlja2VkLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfbGlua1wiKSxcclxuICAgICAgKTtcclxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiZHJvcGRvd25PcHRDbGlja2VkXCIsIHsgZGV0YWlsOiBjbGlja2VkIH0pLFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmlzRHJvcGRvd24gPSBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVNlcXVlbmNlRHJvcGRvd24gPSAoY2xpY2tlZCkgPT4ge1xyXG4gICAgaWYgKFwiaXNEcm9wZG93bkljb25cIiBpbiBjbGlja2VkLmRhdGFzZXQpIHtcclxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiZHJvcGRvd25JY29uQ2xpY2tlZFwiLCB7IGRldGFpbDogY2xpY2tlZCB9KSxcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNEcm9wZG93biA9IHRydWU7XHJcbiAgICAgIHRoaXMuaW5pdFNlY3Rpb24oY2xpY2tlZCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBbmRTaG93QWN0aXZlVHh0V3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsVHh0V3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyID0gdGhpcy5hbGxUeHRXcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VxdWVuY2UgPT09IHRoaXMuYWN0aXZlU2VxdWVuY2UsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBbmRTaG93QWN0aXZlVmlkV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbDIpIHtcclxuICAgICAgICBlbDIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlciA9IHRoaXMuYWxsVmlkV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnNlcXVlbmNlID09PSB0aGlzLmFjdGl2ZVNlcXVlbmNlLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VTdGVwID0gKHNlcXVlbmNlU3RlcERhdGEpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5kYXRhc2V0LnN0ZXAgPT09IHNlcXVlbmNlU3RlcERhdGEpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSAmJiBlbC5vZmZzZXRQYXJlbnQgIT09IG51bGwpXHJcbiAgICAgICAgdGhpcy5hY3RpdmVTZXF1ZW5jZVN0ZXAgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QW5kU2hvd0FjdGl2ZUN0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlciA9IHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZXF1ZW5jZSA9PT0gdGhpcy5hY3RpdmVTZXF1ZW5jZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlQWxsSW50cm9UZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxJbnRyb1R4dC5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBoaWRlQWxsQWN0aW9uSGVhZGluZ3MgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmNsZWFyU2VxdWVuY2VUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuaW50cm8tdHh0LXdyYXBcIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWN0aW9uLWhlYWRpbmdcIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0QWN0aXZlU2VxdWVuY2VTdGVwKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuc3RlcCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQodGhpcy5hY3RpdmVWaWRXcmFwcGVyLCB0aGlzLmFjdGl2ZVNlcXVlbmNlU3RlcCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKHRoaXMucGF1c2VXcmFwcGVyKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgIGlmIChMT09QX1NFUVVFTkNFX1ZJRFMpIHtcclxuICAgICAgICBsZXQgYWN0aXZlU3RlcEluZGV4ID0gWy4uLnRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwc10uaW5kZXhPZihcclxuICAgICAgICAgIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwLnBhcmVudEVsZW1lbnQuZGF0YXNldC5zdGVwLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGFjdGl2ZVN0ZXBJbmRleCA9PT0gdGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzLnNpemUgLSAxKVxyXG4gICAgICAgICAgYWN0aXZlU3RlcEluZGV4ID0gMDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGFjdGl2ZVN0ZXBJbmRleCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXh0U3RlcEJ0biA9IFtcclxuICAgICAgICAgIC4uLnRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKSxcclxuICAgICAgICBdLmZpbmQoXHJcbiAgICAgICAgICAoZWwpID0+XHJcbiAgICAgICAgICAgIGVsLmRhdGFzZXQuc3RlcCA9PT1cclxuICAgICAgICAgICAgWy4uLnRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwc11bYWN0aXZlU3RlcEluZGV4XSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbGF5Q3RybEJ0blZpZChuZXh0U3RlcEJ0bik7XHJcbiAgICAgICAgfSwgMjAwKTsgLy9kZWxheSB0byBzdGFiaWxpemUgZWxlbWVudHMgYmVmb3JlIHBsYXlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xlYXJTZXF1ZW5jZVRpbWVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZXF1ZW5jZVRpbWVyKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBTZXF1ZW5jZTtcclxuIiwgImNvbnNvbGUubG9nKFwiTWF5IDI4LCAyMDI2XCIpO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuaW1wb3J0ICogYXMgZ2xvYmFsIGZyb20gXCIuLzAtZ2xvYmFsXCI7XHJcbmltcG9ydCBOYXZiYXJDbGFzcyBmcm9tIFwiLi8wLW5hdmJhclwiO1xyXG5pbXBvcnQgRmVhdHVyZXNDbGFzcyBmcm9tIFwiLi8xLWZlYXR1cmVzXCI7XHJcbmltcG9ydCBEYXRhQ2xhc3MgZnJvbSBcIi4vMi1kYXRhXCI7XHJcbmltcG9ydCBTZXF1ZW5jZUNsYXNzIGZyb20gXCIuLzMtc2VxdWVuY2VcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXQgY2FsbCAoZnVuY3Rpb24gYXQgYm90dG9tKS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICBpbml0KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuY29uc3QgbmF2Q29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLm5hdl9jb21wb25lbnRcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBmZWF0dXJlc0NvbnRhaW5lciA9IGdsb2JhbC5xdWVyeShcIi5zZWN0aW9uLmZlYXR1cmVzXCIsIGRvY3VtZW50KTtcclxuY29uc3QgZGF0YUNvbnRhaW5lciA9IGdsb2JhbC5xdWVyeShcIi5zZWN0aW9uLmRhdGFcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBzZXF1ZW5jZUNvbnRhaW5lciA9IGdsb2JhbC5xdWVyeShcIi5zZWN0aW9uLnNlcXVlbmNlXCIsIGRvY3VtZW50KTtcclxuY29uc3QgbmF2YmFyID0gbmV3IE5hdmJhckNsYXNzKGdsb2JhbCwgbmF2Q29udGFpbmVyKTtcclxuY29uc3QgZmVhdHVyZXMgPSBuZXcgRmVhdHVyZXNDbGFzcyhnbG9iYWwsIGZlYXR1cmVzQ29udGFpbmVyKTtcclxuY29uc3QgZGF0YSA9IG5ldyBEYXRhQ2xhc3MoZ2xvYmFsLCBkYXRhQ29udGFpbmVyKTtcclxuY29uc3Qgc2VxdWVuY2UgPSBuZXcgU2VxdWVuY2VDbGFzcyhnbG9iYWwsIHNlcXVlbmNlQ29udGFpbmVyKTtcclxuY29uc3QgU0VDVElPTlMgPSB7XHJcbiAgbmF2YmFyOiBuYXZiYXIsXHJcbiAgZmVhdHVyZXM6IGZlYXR1cmVzLFxyXG4gIGRhdGE6IGRhdGEsXHJcbiAgc2VxdWVuY2U6IHNlcXVlbmNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1OQVYuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0Lm5hdlNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0LmNsaWNrQWN0aW9uO1xyXG4gIC8vMS4gR2VuZXJpYyBjbGVhbnVwXHJcbiAgaWYgKFwiaXNEcm9wZG93bkljb25cIiBpbiBjbGlja2VkLmRhdGFzZXQpIHtcclxuICAgIC8vIFBvbHltb3JwaGljIGNhbGwgb25seSAtIGp1c3QgdG9nZ2xpbmcgZHJvcGRvd25cclxuICAgIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChjbGlja2VkLCBhY3Rpb24pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICAvL2RvbnQgZmxhc2ggaWYgb25seSBjbGlja2luZyBkcm9wZG93blxyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIC8vMi4gU3RhdGUgdXBkYXRlXHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oYWN0aXZlU2VjdGlvbik7XHJcbiAgLy8zLiBQb2x5bW9ycGhpYyBjYWxsXHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICBuYXZiYXIuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IG5hdiBkcm9wZG93biBpY29uIGNsaWNrZWRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wZG93bkljb25DbGlja2VkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUuZGV0YWlsO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIG5hdmJhci50b2dnbGVOYXZEcm9wZG93bihjbGlja2VkKTtcclxufSk7XHJcbi8vQ3VzdG9tIGV2ZW50OiBuYXYgZHJvcGRvd24gb3B0IGNsaWNrZWRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS5kZXRhaWw7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgbmF2YmFyLmNsb3NlTmF2RHJvcGRvd24oY2xpY2tlZCk7XHJcbiAgbmF2YmFyLmNsb3NlTW9iaWxlTmF2TWVudSgpO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTUFJTiBCT0RZLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gaG92ZXJlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW91dEFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLVZJRFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL3ZpZCBlbmRlZFxyXG5nbG9iYWwuYWxsVmlkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc3QgZW5kZWRWaWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnZpZFwiKTtcclxuICAgIGlmICghZW5kZWRWaWQpIHJldHVybjtcclxuICAgIGNvbnN0IHZpZFNlY3Rpb24gPSBlbmRlZFZpZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gICAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbdmlkU2VjdGlvbl07XHJcbiAgICB0YXJnZXRNb2R1bGUudmlkRW5kKCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9pbml0XHJcbmNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgc2V0dXBMYXp5TG9hZGluZygpO1xyXG4gIGdsb2JhbC5zZXRXZWJmbG93QnJlYWtwb2ludCgpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIG5hdmJhci5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oXCJmZWF0dXJlc1wiKTtcclxuICBnbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgZmVhdHVyZXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBmZWF0dXJlcy5pbml0U2VjdGlvbihudWxsLCAoaXNJbnRybyA9IHRydWUpKTtcclxuICB9LCBUSU1JTkcuVUkuU1RBUlRfVUlfUkVWRUFMKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG59O1xyXG5jb25zdCBzZXR1cExhenlMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IGFsbExhenlWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbiAgY29uc3Qgb2JzZXJ2ZXJPcHRpb25zID0ge1xyXG4gICAgcm9vdDogbnVsbCxcclxuICAgIHJvb3RNYXJnaW46IFwiMHB4XCIsXHJcbiAgICB0aHJlc2hvbGQ6IDAuMSxcclxuICB9O1xyXG4gIGNvbnN0IHZpZGVvT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgdmlkZW8gPSBlbnRyeS50YXJnZXQ7XHJcbiAgICAgIGNvbnN0IHNvdXJjZXMgPSB2aWRlby5xdWVyeVNlbGVjdG9yQWxsKFwic291cmNlXCIpO1xyXG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAvLyAtLS0gTE9BRCBMT0dJQyAtLS1cclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gVXNlIGRhdGEtc3JjIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGtlZXAgY3VycmVudCBzcmNcclxuICAgICAgICAgIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgfHwgc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChkYXRhU3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBkYXRhU3JjO1xyXG4gICAgICAgICAgICAvLyBLZWVwIGRhdGEtc3JjIGF0dHJpYnV0ZSBzbyB3ZSBjYW4gZmluZCB0aGUgVVJMIGFnYWluIGxhdGVyXHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBkYXRhU3JjKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gLS0tIFVOTE9BRCBMT0dJQyAtLS1cclxuICAgICAgICAvLyBDbGVhcnMgdGhlIGludGVybmFsIGxvZ3MgZm9yIHVzZXIgaW50ZXJhY3Rpb25zIGFuZCByZXNvdXJjZSBsb2Fkc1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyTWVhc3VyZXMoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhclJlc291cmNlVGltaW5ncygpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyTWFya3MoKTtcclxuICAgICAgICBSZXNldFNlY3Rpb24odmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpKTtcclxuICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBNb3ZlIHNyYyBiYWNrIHRvIGRhdGEtc3JjIGFuZCBlbXB0eSB0aGUgY3VycmVudCBzcmNcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRTcmMgPSBzb3VyY2Uuc3JjO1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnRTcmMpIHtcclxuICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIsIGN1cnJlbnRTcmMpO1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gXCJcIjsgLy8gVGhpcyBzdG9wcyB0aGUgdmlkZW8gZnJvbSBidWZmZXJpbmdcclxuICAgICAgICAgICAgc291cmNlLnJlbW92ZUF0dHJpYnV0ZShcInNyY1wiKTsgLy8gRnVsbHkgY2xlYXIgYXR0cmlidXRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIGJyb3dzZXIgdG8gZHVtcCB0aGUgdmlkZW8gZGF0YSBmcm9tIG1lbW9yeVxyXG4gICAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgb2JzZXJ2ZXJPcHRpb25zKTtcclxuICBhbGxMYXp5Vmlkcy5mb3JFYWNoKCh2aWQpID0+IHZpZGVvT2JzZXJ2ZXIub2JzZXJ2ZSh2aWQpKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9SRVNFVCBWSURTIEFGVEVSIFVOTE9BRElORy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGNvbnN0IFJlc2V0U2VjdGlvbiA9IGZ1bmN0aW9uIChzZWN0aW9uKSB7XHJcbiAgICBpZiAoIXNlY3Rpb24pIHJldHVybjsgLy9oZWxwcyBwcmV2ZW50IGNyYXNoZXNcclxuICAgIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICBlbC5wYXVzZSgpO1xyXG4gICAgfSk7XHJcbiAgICBnbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKHNlY3Rpb24pO1xyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQU8sTUFBTSxTQUFTLE9BQU8sT0FBTztBQUFBLElBQ2xDLElBQUk7QUFBQSxNQUNGLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLHlCQUF5QjtBQUFBLElBQzNCO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsSUFDakI7QUFBQSxFQUNGLENBQUM7QUFDTSxNQUFNLFNBQVMsT0FBTyxPQUFPO0FBQUEsSUFDbEMsVUFBVTtBQUFBLE1BQ1IsU0FDRTtBQUFBLE1BQ0YsUUFDRTtBQUFBLElBQ0o7QUFBQSxFQUNGLENBQUM7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
