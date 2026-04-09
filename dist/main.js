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
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066780bffd055268006d5_Data-View-1-MP.webp"
    }
  });
  var VIEW_START_END = Object.freeze({
    "view-1": {
      startTime: 0,
      endTime: 0
    }
  });

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
      activeVidWrap.querySelectorAll(".vid-code").forEach((el) => {
        if (el.dataset.step === activeSequenceStep && el.querySelector(".vid").offsetParent !== null) {
          _state.activeVid = el.querySelector(".vid");
        }
      });
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
          this.activeSequenceStep = el;
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
        if (el.querySelector(".vid").offsetParent !== null)
          this.activeSequenceStep = el;
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
      this.global.setActiveVid(
        this.activeVidWrapper,
        this.activeSequenceStep.dataset.step
      );
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
        let activeStepIndex = [...this.allActiveSequenceSteps].indexOf(
          this.activeSequenceStep.dataset.step
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
        this.playCtrlBtnVid(nextStepBtn);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjFlNzdiMWUzZGRmYzc2YjZmZTgxNDQ2LzY5ZDZiNmY1OTAzZmUxMWFkOWRhZTBjNl9Db21wcyUyMFZpZXctU3RhcnQlMjBTaG90JTIwKHdpdGglMjBjb21wcykud2VicFwiLFxyXG4gICAgbW9iaWxlOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4MGJmZmQwNTUyNjgwMDZkNV9EYXRhLVZpZXctMS1NUC53ZWJwXCIsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBWSUVXX1NUQVJUX0VORCA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFwidmlldy0xXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMCxcclxuICAgIGVuZFRpbWU6IDAsXHJcbiAgfSxcclxufSk7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZXhwb3J0IGNvbnN0IG1haW5XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXdyYXBwZXJcIik7XHJcbmV4cG9ydCBjb25zdCBibGFja291dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmxhY2tvdXRcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxTZWN0aW9ucyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb25cIildO1xyXG5leHBvcnQgY29uc3QgYWxsVmlkQ29kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpO1xyXG5leHBvcnQgY29uc3QgYWxsVmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpO1xyXG5leHBvcnQgY29uc3QgbmF2TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxOYXZNZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdl9tZW51X2xpbmtcIik7XHJcbmV4cG9ydCBjb25zdCBuYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9idXR0b25cIik7XHJcbmV4cG9ydCBjb25zdCBfc3RhdGUgPSB7XHJcbiAgYWN0aXZlU2VjdGlvbjogbnVsbCxcclxuICBhY3RpdmVTZWN0aW9uTmFtZTogbnVsbCxcclxuICBhY3RpdmVWaWQ6IG51bGwsXHJcbiAgd2ViZmxvd0JyZWFrcG9pbnQ6IG51bGwsXHJcbiAgc3RhcnRUaW1lOiAwLFxyXG4gIGVuZFRpbWU6IDAsXHJcbiAgcGF1c2VGbGFnOiBmYWxzZSxcclxufTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0dMT0JBTCBGVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vVGhlICdTdHJpY3QnIFNlbGVjdG9yXHJcbmV4cG9ydCBjb25zdCBxdWVyeSA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSB7XHJcbiAgY29uc3QgZWwgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gIGlmICghZWwpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYENSSVRJQ0FMIFVJIEVSUk9SOiBcIiR7c2VsZWN0b3J9XCIgaXMgbWlzc2luZyBmcm9tIHRoZSBET00uYCxcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBlbDtcclxufTtcclxuLy9UaGUgJ1N0cmljdCcgTXVsdC1TZWxlY3RvclxyXG5leHBvcnQgY29uc3QgcXVlcnlBbGwgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkge1xyXG4gIGNvbnN0IGVsZW1lbnRzID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBDUklUSUNBTCBVSSBFUlJPUjogTm8gZWxlbWVudHMgbWF0Y2hpbmcgXCIke3NlbGVjdG9yfVwiIGZvdW5kLmAsXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gZWxlbWVudHM7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRWaWRUeXBlID0gZnVuY3Rpb24gKHZpZGVvKSB7XHJcbiAgcmV0dXJuIHZpZGVvLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5jbGFzc0xpc3RbMV07XHJcbn07XHJcbmV4cG9ydCBjb25zdCBmbGFzaEJsYWNrb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gIGJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0sIFRJTUlORy5VSS5CTEFDS09VVF9USU1FUik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVOYXZMaW5rc0FuZE5hdkJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICBuYXZNZW51LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxuICBuYXZCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aXZhdGVDdXJyZW50TmF2TGluayA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnROYXZMaW5rcygpO1xyXG4gIGNsaWNrZWQuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbE5hdk1lbnVMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb25OYW1lLCBpbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxTZWN0aW9ucygpO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uTmFtZSA9IHNlY3Rpb25OYW1lO1xyXG4gIGlmICghaW5kZXgpIGluZGV4ID0gMDtcclxuICBjb25zdCBtYXRjaGVzID0gYWxsU2VjdGlvbnMuZmlsdGVyKFxyXG4gICAgKGVsKSA9PiBlbC5kYXRhc2V0LnNlY3Rpb24gPT09IHNlY3Rpb25OYW1lLFxyXG4gICk7XHJcbiAgY29uc3QgdGFyZ2V0ID0gbWF0Y2hlc1tpbmRleF07XHJcbiAgaWYgKHRhcmdldCkge1xyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBfc3RhdGUuYWN0aXZlU2VjdGlvbiA9IHRhcmdldDtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsU2VjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWxsU2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBY3RpdmVWaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIF9zdGF0ZS5hY3RpdmVWaWQ7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVWaWQgPSBmdW5jdGlvbiAoYWN0aXZlVmlkV3JhcCwgYWN0aXZlU2VxdWVuY2VTdGVwKSB7XHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQpIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuc3JjID0gXCJcIjtcclxuICB9XHJcbiAgaWYgKGFjdGl2ZVZpZFdyYXAgJiYgYWN0aXZlU2VxdWVuY2VTdGVwID09PSBudWxsKSB7XHJcbiAgICBhY3RpdmVWaWRXcmFwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIF9zdGF0ZS5hY3RpdmVWaWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChhY3RpdmVWaWRXcmFwICYmIGFjdGl2ZVNlcXVlbmNlU3RlcCkge1xyXG4gICAgYWN0aXZlVmlkV3JhcC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBlbC5kYXRhc2V0LnN0ZXAgPT09IGFjdGl2ZVNlcXVlbmNlU3RlcCAmJlxyXG4gICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpLm9mZnNldFBhcmVudCAhPT0gbnVsbFxyXG4gICAgICApIHtcclxuICAgICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIikub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgX3N0YXRlLmFjdGl2ZVZpZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRXZWJmbG93QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLndlYmZsb3dCcmVha3BvaW50O1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0V2ViZmxvd0JyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICBpZiAod2lkdGggPCA0ODApIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwibW9iaWxlUG9ydHJhaXRcIjtcclxuICBpZiAod2lkdGggPj0gNDgwKSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcIm1vYmlsZUxhbmRzY2FwZVwiO1xyXG4gIGlmICh3aWR0aCA+PSA3NjgpIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwidGFibGV0XCI7XHJcbiAgaWYgKHdpZHRoID49IDk5MikgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJkZXNrdG9wXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRTdGFydFRpbWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICBfc3RhdGUuc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRFbmRUaW1lID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgX3N0YXRlLmVuZFRpbWUgPSBuZXdWYWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuc3JjID0gXCJcIjtcclxuICAgIGVsLmxvYWQoKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlc2V0QWxsU2VjdGlvblZpZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgIGVsLnBhdXNlKCk7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBwbGF5UmFuZ2UgPSBmdW5jdGlvbiAodmlkZW9DdXJyZW50VGltZSkge1xyXG4gIGlmICghX3N0YXRlLmFjdGl2ZVZpZCkgcmV0dXJuO1xyXG4gIGNvbnN0IHZpZENvZGUgPSBfc3RhdGUuYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IF9zdGF0ZS5zdGFydFRpbWU7XHJcbiAgLy8gQ0xFQU5VUDogS2lsbCBhbnkgcHJldmlvdXMgbW9uaXRvciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwidGltZXVwZGF0ZVwiLFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICAgICk7XHJcbiAgfVxyXG4gIC8vIDEuIEhJRERFTiBTVEFURTogSW5zdGFudCBoaWRlIHRvIHJldmVhbCB2aWQtd3JhcCBiYWNrZ3JvdW5kIGltYWdlXHJcbiAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgXCJ0aW1ldXBkYXRlXCIsXHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICApO1xyXG4gIGNvbnN0IG1vbml0b3JUaW1lID0gKCkgPT4ge1xyXG4gICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gX3N0YXRlLmVuZFRpbWUgLSAwLjE1KSB7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgbW9uaXRvclRpbWUpO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPSBfc3RhdGUuZW5kVGltZTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yID0gbW9uaXRvclRpbWU7XHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gX3N0YXRlLmFjdGl2ZVZpZC5xdWVyeVNlbGVjdG9yKFwic291cmNlXCIpO1xyXG4gIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UgPyBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgOiBudWxsO1xyXG4gIGlmIChkYXRhU3JjICYmIF9zdGF0ZS5hY3RpdmVWaWQuc3JjICE9PSBkYXRhU3JjKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnNyYyA9IGRhdGFTcmM7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmxvYWQoKTtcclxuICB9XHJcbiAgY29uc3Qgc3RhcnRQbGF5YmFja1NlcXVlbmNlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IHRhcmdldFN0YXJ0O1xyXG4gICAgICAvLyAyLiBUSEUgRkFJTC1TQUZFIFJFVkVBTFxyXG4gICAgICAvLyBXZSBwb2xsIGZvciBwaHlzaWNhbCBwbGF5aGVhZCBtb3ZlbWVudC4gT25jZSBpdCBtb3ZlcyxcclxuICAgICAgLy8gdGhlIFwiYmxhY2sgYnVmZmVyXCIgaXMgZ3VhcmFudGVlZCB0byBiZSBnb25lLlxyXG4gICAgICBjb25zdCBwb2xsRm9yRnJhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPiB0YXJnZXRTdGFydCkge1xyXG4gICAgICAgICAgLy8gRG91YmxlIFJBRiBpcyB0aGUgZmluYWwgZ3VhcmQgZm9yIHRoZSBHUFUgcGFpbnQgY3ljbGVcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxhY2tvdXQgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIV9zdGF0ZS5hY3RpdmVWaWQucGF1c2VkKSB7XHJcbiAgICAgICAgICAvLyBJZiBzdGlsbCBhdCB0YXJnZXRTdGFydCBidXQgcGxheWluZywgY2hlY2sgYWdhaW4gbmV4dCBmcmFtZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBvbGxGb3JGcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICAvLyAzLiBTVEFSVFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYXdhaXQgX3N0YXRlLmFjdGl2ZVZpZC5wbGF5KCk7XHJcbiAgICAgIHBvbGxGb3JGcmFtZSgpOyAvLyBTdGFydCBjaGVja2luZyBmb3IgdGhlIGZpcnN0IHJlYWwgZnJhbWVcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiUGxheWJhY2sgZmFpbGVkOlwiLCBlKTtcclxuICAgICAgLy8gRmFsbGJhY2s6IHNob3cgdmlkZW8gYW55d2F5IGlmIHBsYXkoKSBmYWlscyAoZS5nLiBhdXRwbGF5IGJsb2NrZWQpXHJcbiAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH1cclxuICB9O1xyXG4gIC8vIFdhaXQgZm9yIGRhdGEgKHJlYWR5U3RhdGUgMyBpcyBIQVZFX0ZVVFVSRV9EQVRBKVxyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkLnJlYWR5U3RhdGUgPj0gMykge1xyXG4gICAgc3RhcnRQbGF5YmFja1NlcXVlbmNlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIiwgc3RhcnRQbGF5YmFja1NlcXVlbmNlLCB7XHJcbiAgICAgIG9uY2U6IHRydWUsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLnBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIucGF1c2Utd3JhcFwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB0b2dnbGVQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAoX3N0YXRlLnBhdXNlRmxhZykge1xyXG4gICAgX3N0YXRlLnBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wbGF5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9zdGF0ZS5wYXVzZUZsYWcgPSB0cnVlO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRpc2FibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uIChidG5XcmFwcGVySW5kZXgpIHtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZUJ0bkhvdmVyQ2xhc3MgPSBmdW5jdGlvbiAoYnRuKSB7XHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQgJiYgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID09PSBcImRlc2t0b3BcIilcclxuICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiaG92ZXJlZFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudEJ0biA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxuICB9LCA1MCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudEJ0bnMgPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gIGlmICghc2VjdGlvbikgc2VjdGlvbiA9IF9zdGF0ZS5hY3RpdmVTZWN0aW9uO1xyXG4gIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRMb2NhbEluZGV4ID0gZnVuY3Rpb24gKGJ0biwgYnRuQ2xhc3MsIGFsbEJ0bnNXcmFwcGVyKSB7XHJcbiAgbGV0IGxvY2FsSW5kZXg7XHJcbiAgY29uc3QgYWxsQnRucyA9IGJ0blxyXG4gICAgLmNsb3Nlc3QoYC4ke2FsbEJ0bnNXcmFwcGVyfWApXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7YnRuQ2xhc3N9YCk7XHJcbiAgYWxsQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgIGlmIChlbCA9PT0gYnRuKSBsb2NhbEluZGV4ID0gaW5kZXg7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGxvY2FsSW5kZXg7XHJcbn07XHJcbiIsICJjbGFzcyBOYXZiYXIge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLm5hdk1lbnUgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5uYXZfbWVudVwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLm5hdkJ0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm5hdl9idXR0b25cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rcyA9IHRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm5hdl9tZW51X2xpbmtcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rc1dpdGhEcm9wZG93biA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoJ1tkYXRhLW5hdi1zZWN0aW9uPVwic2VxdWVuY2VcIl0nLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxOYXZEcm9wZG93bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tbmF2LWRyb3Bkb3duXCIsIHRoaXMub3Blbk5hdkRyb3Bkb3duXSxcclxuICAgICAgW1wiY2xvc2UtbmF2LWRyb3Bkb3duXCIsIHRoaXMuY2xvc2VOYXZEcm9wZG93bl0sXHJcbiAgICAgIFtcInRvZ2dsZS1uYXYtZHJvcGRvd25cIiwgdGhpcy50b2dnbGVOYXZEcm9wZG93bl0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBoYW5kbGVFdmVudCA9IGZ1bmN0aW9uICh0cmlnZ2VyLCBldmVudEFjdGlvbikge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbG9zZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbG9zZU1vYmlsZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoXCJuYXZNZW51T3BlblwiIGluIHRoaXMubmF2TWVudS5kYXRhc2V0KSB0aGlzLm5hdkJ0bi5jbGljaygpO1xyXG4gICAgdGhpcy5uYXZNZW51LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIG9wZW5OYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0cmlnZ2VyXHJcbiAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGNsb3NlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB0b2dnbGVOYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKHRyaWdnZXIpO1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZXMge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5ibGFja291dFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dCA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIudHh0LXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIudmlkLXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdiA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi52aWQtd3JhcC5pbnRyb1wiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2ID0gdGhpcy5nbG9iYWwucXVlcnkoXHJcbiAgICAgIFwiLnZpZC13cmFwLmZlYXR1cmVzXCIsXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5nbG9iYWwucXVlcnkoXCIucGF1c2Utd3JhcFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIuc2VjdGlvbi13cmFwLWJ0bnNcIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVGZWF0dXJlID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcCA9IG51bGw7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZmVhdHVyZXNcIiwgdGhpcy5pbml0U2VjdGlvbl0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZF0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkXSxcclxuICAgICAgW1wiYnRuLWhvdmVyZWRcIiwgdGhpcy5nbG9iYWwudG9nZ2xlQnRuSG92ZXJDbGFzcy5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gKGNsaWNrZWQsIGlzSW50cm8pID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIGlmIChjbGlja2VkKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgaWYgKGlzSW50cm8pIHJldHVybjtcclxuICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhpZGVBbGxUZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0ludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gXCJpbnRyb1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVGZWF0dXJlKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc0ludHJvVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNJbnRyb1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzVmlkRGl2ID0gKGZlYXR1cmUpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW50cm9cIikpIHJldHVybjtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQuZmVhdHVyZSA9PT0gZmVhdHVyZSkge1xyXG4gICAgICAgIHRoaXMuYWNpdHZlVmlkV3JhcCA9IGVsO1xyXG4gICAgICAgIHRoaXMuYWNpdHZlVmlkV3JhcC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW50cm9cIikpIHJldHVybjtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUZlYXR1cmVzSW50cm8gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzVmlkRGl2KCk7XHJcbiAgICAvLyBMb2dpYzogRmluZCB0aGUgb25lIHRoYXQgaXNuJ3QgaGlkZGVuIChkaXNwbGF5OiBub25lKVxyXG4gICAgY29uc3QgYWxsSW50cm9zID1cclxuICAgICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGUtaW50cm9cIik7XHJcbiAgICBhbGxJbnRyb3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgLy8gb2Zmc2V0UGFyZW50IGlzIG51bGwgaWYgdGhlIGVsZW1lbnQgaXMgZGlzcGxheTogbm9uZVxyXG4gICAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgdmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWQtaW50cm9cIik7XHJcbiAgICAgICAgaWYgKHZpZCkge1xyXG4gICAgICAgICAgdmlkLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgIHZpZC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZXNUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc1ZpZERpdihjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmZlYXR1cmUpO1xyXG4gICAgdGhpcy5hY3RpdmVGZWF0dXJlID0gY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5mZWF0dXJlO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlVGV4dCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKHRoaXMuYWNpdHZlVmlkV3JhcCwgbnVsbCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwucmVzZXRBbGxTZWN0aW9uVmlkcygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAgICAgICB9LCBUSU1JTkcuVUkuQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwpO1xyXG4gICAgICB9LCBUSU1JTkcuVklERU8uVklEX0VORF9USU1FUik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbGVhckZlYXR1cmVzVGltZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZlYXR1cmVzVGltZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVzO1xyXG4iLCAiaW1wb3J0IHsgQVNTRVRTLCBWSUVXX1NUQVJUX0VORCB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbmNvbnN0IEhPTUVfVklFVyA9IFwidmlldy0xXCI7XHJcbmNsYXNzIERhdGEge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmludHJvVGV4dCA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24td3JhcC10eHRcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm9wdHMtbWVudS1idG5cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5vcHRzLWRyb3Bkb3duXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsVmlld09wdEJ0bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm9wdHMtbWVudS1saW5rXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmRpbW1lciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLmRpbW1lclwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnR4dC1pbWctYnRuXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxEYXRhID0gWy4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLmNvbXAtZGF0YS13cmFwXCIsIHRoaXMuY29udGFpbmVyKV07XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSBcInZpZXctMVwiO1xyXG4gICAgdGhpcy5sYXN0QWN0aXZlVmlldyA9IHsgdmlldzogXCJ2aWV3LTFcIiwgc3RhcnRUaW1lOiAwLCBlbmRUaW1lOiAwIH07XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLnZpZXdDaGFpbkZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnNbMF07XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSAwO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1kYXRhXCIsIHRoaXMuaW5pdFNlY3Rpb25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMuc2V0QW5kUGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwbGF5LXZpZXctdmlkXCIsIHRoaXMuc2V0QW5kUGxheVZpZXdWaWRdLFxyXG4gICAgICBbXCJiYWNrLXRvLXZpZXdcIiwgdGhpcy5iYWNrVG9WaWV3RnJvbUNvbXBdLFxyXG4gICAgICBbXCJvcGVuLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuc2hvd1ZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcImNsb3NlLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuaGlkZVZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcInRvZ2dsZS1pbWctdHh0XCIsIHRoaXMuc2hvd0NvbXBJbWFnZU9yVGV4dF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICAgIHRoaXMuYXNzZXRzTWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcInZpZXctMVwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0uZGVza3RvcF0sXHJcbiAgICAgIFtcInZpZXctMS1tcFwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0ubW9iaWxlXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gKGNsaWNrZWQpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRJbWdCdG4udGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIGJja2dybmQgaW1nXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzaG93Vmlld09wdHNNZW51ID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVWaWV3T3B0c01lbnUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0NvbXBJbWFnZU9yVGV4dCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnR4dE9ySW1nID09PSBcImltYWdlXCIpIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwidGV4dFwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHh0T3JJbWc7XHJcbiAgfTtcclxuICBoaWRlQWxsRGF0YSA9ICgpID0+IHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUFsbERhdGFXcmFwcGVycygpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG4gIHNob3dEYXRhID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5kYXRhc2V0LmNvbXAgPT09IHRoaXMuYWN0aXZlQ3RybEJ0bi5kYXRhc2V0LmNvbXApXHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQgPSBlbDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVCYWNrQnRuID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0JhY2tCdG4gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcmVzZXRBbGxEYXRhU2hlZXRzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxEYXRhLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5jb21wLWRhdGEtYm9keS13cmFwXCIpLnNjcm9sbCgwLCAwKTtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRMYXN0QWN0aXZlVmlldyA9IChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVZpZXcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC52aWV3O1xyXG4gIH07XHJcbiAgdmlld0JhY2tUb1N0YXJ0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IFZJRVdfU1RBUlRfRU5EW3RoaXMubGFzdEFjdGl2ZVZpZXcudmlld10uZW5kVGltZTtcclxuICB9O1xyXG4gIHNldFZpZXdWaWRTdGFydEFuZEVuZCA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgIT09IEhPTUVfVklFVyAmJlxyXG4gICAgICB0aGlzLmFjdGl2ZVZpZXcgPT09IEhPTUVfVklFV1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMudmlld0JhY2tUb1N0YXJ0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ICE9PSBIT01FX1ZJRVcgJiZcclxuICAgICAgdGhpcy5hY3RpdmVWaWV3ICE9PSBIT01FX1ZJRVdcclxuICAgICkge1xyXG4gICAgICB0aGlzLnZpZXdDaGFpbkZsYWcgPSB0cnVlO1xyXG4gICAgICB0aGlzLnZpZXdCYWNrVG9TdGFydCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuYWN0aXZlVmlld0J0bi5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuYWN0aXZlVmlld0J0bi5kYXRhc2V0LmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXREYXRhVmlkU3RhcnRBbmRFbmQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuYWN0aXZlQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuYWN0aXZlQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXREYXRhVmlkUG9zdGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWN0aXZlVmlkID0gdGhpcy5nbG9iYWwuZ2V0QWN0aXZlVmlkKCk7XHJcbiAgICBpZiAoIWFjdGl2ZVZpZCkgcmV0dXJuO1xyXG4gICAgbGV0IG1hcEtleSA9IHRoaXMuYWN0aXZlVmlldztcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkgbWFwS2V5ICs9IFwiLW1wXCI7XHJcbiAgICBjb25zdCBhc3NldCA9IHRoaXMuYXNzZXRzTWFwLmdldChtYXBLZXkpO1xyXG4gICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBhc3NldCk7XHJcbiAgfTtcclxuICBzZXREYXRhVmlkQmFja2dyb3VuZEltZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpO1xyXG4gICAgaWYgKCFhY3RpdmVWaWQpIHJldHVybjtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSBhY3RpdmVWaWQuY2xvc2VzdChcIi52aWQtd3JhcFwiKTtcclxuICAgIGxldCBtYXBLZXkgPSB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXc7XHJcbiAgICBpZiAoYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXBcIikpIG1hcEtleSArPSBcIi1tcFwiO1xyXG4gICAgY29uc3QgYXNzZXQgPSB0aGlzLmFzc2V0c01hcC5nZXQobWFwS2V5KTtcclxuICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7YXNzZXR9XCIpYDtcclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRQbGF5Vmlld1ZpZCA9IChjbGlja2VkVmlld09wdHNCdG4pID0+IHtcclxuICAgIC8vcmV0dXJuIGlmIGNsaWNrZWQgdmlldyBzYW1lIGFzIGN1cnJlbnQgdmlld1xyXG4gICAgaWYgKGNsaWNrZWRWaWV3T3B0c0J0bi5kYXRhc2V0LnZpZXcgPT09IHRoaXMuYWN0aXZlVmlldykgcmV0dXJuO1xyXG4gICAgLy9zZXR0aW5nIFVJIGFuZCBsb2dpYy4uLlxyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMudmlld09wdHNCdG4udGV4dENvbnRlbnQgPSBjbGlja2VkVmlld09wdHNCdG4udGV4dENvbnRlbnQ7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyID0gdGhpcy5hbGxEYXRhV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnZpZXcgPT09IGNsaWNrZWRWaWV3T3B0c0J0bi5kYXRhc2V0LnZpZXcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3QnRuID0gY2xpY2tlZFZpZXdPcHRzQnRuO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlVmlldygpOyAvL2ZvciB0aGUgcG9zdGVyXHJcbiAgICB0aGlzLnNldEFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICAvL3BsYXkgdmlkXHJcbiAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheUN0cmxCdG5WaWQgPSAoY2xpY2tlZEN0cmxCdG4pID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciB0aGUgYmNrZ3JuZCBpbWcgdG8gY2hhbmdlIHRvIGNvbXAgdmlkIHN0YXJ0c1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5oaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0biA9IGNsaWNrZWRDdHJsQnRuO1xyXG4gICAgLy9wbGF5XHJcbiAgICB0aGlzLnNldERhdGFWaWRTdGFydEFuZEVuZCh0aGlzLmFjdGl2ZUN0cmxCdG4pO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpOyAvL3JlbW92ZXMgYmxhY2tvdXQgaW4gZ2xvYmFsLnBsYXlSYW5nZVxyXG4gIH07XHJcbiAgcGxheURhdGFWaWQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKHRoaXMuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUodGhpcy5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgLy8gaWYgKHRoaXMudmlld1ZpZEZsYWcgJiYgIXRoaXMudmlld0NoYWluRmxhZykge1xyXG4gICAgLy8gICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7XHJcbiAgICAvLyAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIC8vICAgdGhpcy5zZXREYXRhVmlkUG9zdGVyKCk7IC8vZG9uZSBoZXJlIHNvIHBvc3RlciBkb2Vzbid0IGFwcGVhciBlYXJsaWVyXHJcbiAgICAvLyAgIHRoaXMuc2hvd0FjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICAvLyAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAvLyAgIHRoaXMuZ2xvYmFsLmVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuKCk7XHJcbiAgICAvLyB9IGVsc2UgaWYgKHRoaXMudmlld0NoYWluRmxhZykge1xyXG4gICAgLy8gICB0aGlzLnZpZXdDaGFpbkZsYWcgPSBmYWxzZTtcclxuICAgIC8vICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldyhIT01FX1ZJRVcpO1xyXG4gICAgLy8gICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAvLyAgIHRoaXMuc2V0Vmlld1ZpZFN0YXJ0QW5kRW5kKCk7XHJcbiAgICAvLyAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIHRoaXMuc2hvd0JhY2tCdG4oKTtcclxuICAgIC8vc2V0IGJja2dybmQgaW1nIHRvIGJsYWNrIHRvIHByZXZlbnQgZmxhc2ggb2YgaW1hZ2Ugd2hlbiBjaGFuZ2luZyBuYXZcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKS5jbG9zZXN0KFwiLnZpZC13cmFwXCIpO1xyXG4gICAgaWYgKGFjdGl2ZVZpZFdyYXApIHtcclxuICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIm5vbmVcIjtcclxuICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICB9XHJcbiAgICAvLyB9XHJcbiAgfTtcclxuICBiYWNrVG9WaWV3RnJvbUNvbXAgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUJhY2tCdG4oKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcblxyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgfTtcclxuICBoaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93Q3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnZpZXcgPT09IHRoaXMuYWN0aXZlVmlldyxcclxuICAgICk7XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGF0YTtcclxuIiwgImNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5wYXVzZS13cmFwXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsVHh0V3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnR4dC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEludHJvVHh0ID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5pbnRyby10eHQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuYWN0aW9uLWhlYWRpbmdcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnZpZC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuaXNEcm9wZG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVNlY3Rpb25UeHQgPSBudWxsO1xyXG4gICAgLy8gdGhpcy5jdXJyZW50VmlkV3JhcHBlciA9IFwic2VxdWVuY2UtMVwiO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwID0gbnVsbDtcclxuICAgIHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcyA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gbnVsbDtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZVwiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZS1pbmRleFwiLCB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlRHJvcGRvd25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlID0gY2xpY2tlZC5kYXRhc2V0LnNlcXVlbmNlO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5oaWRlQWxsSW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmhpZGVBbGxBY3Rpb25IZWFkaW5ncygpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlVHh0V3JhcHBlcigpO1xyXG4gICAgLy8gaWYgKFxyXG4gICAgLy8gICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIgJiZcclxuICAgIC8vICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyLmRhdGFzZXQuc2VxdWVuY2UgIT09IHRoaXMuY3VycmVudFZpZFdyYXBwZXJcclxuICAgIC8vIClcclxuICAgIHRoaXMuc2V0QW5kU2hvd0FjdGl2ZVZpZFdyYXBwZXIoKTtcclxuICAgIHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcyA9IG5ldyBTZXQoKTtcclxuICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5hY3RpdmVWaWRXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbiAgICBzdGVwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICB0aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHMuYWRkKGVsLmRhdGFzZXQuc3RlcCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2V0QW5kU2hvd0FjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuaW50cm8tdHh0LXdyYXBcIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBpZiAoIXRoaXMuaXNEcm9wZG93bikge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhcclxuICAgICAgICBjbGlja2VkLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfbGlua1wiKSxcclxuICAgICAgKTtcclxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiZHJvcGRvd25PcHRDbGlja2VkXCIsIHsgZGV0YWlsOiBjbGlja2VkIH0pLFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmlzRHJvcGRvd24gPSBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVNlcXVlbmNlRHJvcGRvd24gPSAoY2xpY2tlZCkgPT4ge1xyXG4gICAgaWYgKFwiaXNEcm9wZG93bkljb25cIiBpbiBjbGlja2VkLmRhdGFzZXQpIHtcclxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiZHJvcGRvd25JY29uQ2xpY2tlZFwiLCB7IGRldGFpbDogY2xpY2tlZCB9KSxcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNEcm9wZG93biA9IHRydWU7XHJcbiAgICAgIHRoaXMuaW5pdFNlY3Rpb24oY2xpY2tlZCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBbmRTaG93QWN0aXZlVHh0V3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsVHh0V3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyID0gdGhpcy5hbGxUeHRXcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VxdWVuY2UgPT09IHRoaXMuYWN0aXZlU2VxdWVuY2UsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBbmRTaG93QWN0aXZlVmlkV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbDIpIHtcclxuICAgICAgICBlbDIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlciA9IHRoaXMuYWxsVmlkV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnNlcXVlbmNlID09PSB0aGlzLmFjdGl2ZVNlcXVlbmNlLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgLy8gdGhpcy5jdXJyZW50VmlkV3JhcHBlciA9IHRoaXMuYWN0aXZlVmlkV3JhcHBlci5kYXRhc2V0LnNlcXVlbmNlO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VTdGVwID0gKHNlcXVlbmNlU3RlcERhdGEpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5kYXRhc2V0LnN0ZXAgPT09IHNlcXVlbmNlU3RlcERhdGEpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlU3RlcCA9IGVsO1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIikub2Zmc2V0UGFyZW50ICE9PSBudWxsKVxyXG4gICAgICAgIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwID0gZWw7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VxdWVuY2UgPT09IHRoaXMuYWN0aXZlU2VxdWVuY2UsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUFsbEludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsSW50cm9UeHQuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgaGlkZUFsbEFjdGlvbkhlYWRpbmdzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBwbGF5Q3RybEJ0blZpZCA9IChjbGlja2VkQ3RybEJ0bikgPT4ge1xyXG4gICAgdGhpcy5jbGVhclNlcXVlbmNlVGltZXJzKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmludHJvLXR4dC13cmFwXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFjdGlvbi1oZWFkaW5nXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlU3RlcChjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0ZXApO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKFxyXG4gICAgICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIsXHJcbiAgICAgIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwLmRhdGFzZXQuc3RlcCxcclxuICAgICk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKHRoaXMucGF1c2VXcmFwcGVyKTtcclxuICAgICAgbGV0IGFjdGl2ZVN0ZXBJbmRleCA9IFsuLi50aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHNdLmluZGV4T2YoXHJcbiAgICAgICAgdGhpcy5hY3RpdmVTZXF1ZW5jZVN0ZXAuZGF0YXNldC5zdGVwLFxyXG4gICAgICApO1xyXG4gICAgICBpZiAoYWN0aXZlU3RlcEluZGV4ID09PSB0aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHMuc2l6ZSAtIDEpXHJcbiAgICAgICAgYWN0aXZlU3RlcEluZGV4ID0gMDtcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgYWN0aXZlU3RlcEluZGV4ICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV4dFN0ZXBCdG4gPSBbXHJcbiAgICAgICAgLi4udGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLFxyXG4gICAgICBdLmZpbmQoXHJcbiAgICAgICAgKGVsKSA9PlxyXG4gICAgICAgICAgZWwuZGF0YXNldC5zdGVwID09PSBbLi4udGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzXVthY3RpdmVTdGVwSW5kZXhdLFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnBsYXlDdHJsQnRuVmlkKG5leHRTdGVwQnRuKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNsZWFyU2VxdWVuY2VUaW1lcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VxdWVuY2VUaW1lcik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU2VxdWVuY2U7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBnbG9iYWwgZnJvbSBcIi4vMC1nbG9iYWxcIjtcclxuaW1wb3J0IE5hdmJhckNsYXNzIGZyb20gXCIuLzAtbmF2YmFyXCI7XHJcbmltcG9ydCBGZWF0dXJlc0NsYXNzIGZyb20gXCIuLzEtZmVhdHVyZXNcIjtcclxuaW1wb3J0IERhdGFDbGFzcyBmcm9tIFwiLi8yLWRhdGFcIjtcclxuaW1wb3J0IFNlcXVlbmNlQ2xhc3MgZnJvbSBcIi4vMy1zZXF1ZW5jZVwiO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdCBjYWxsIChmdW5jdGlvbiBhdCBib3R0b20pLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gIGluaXQoKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5jb25zdCBuYXZDb250YWluZXIgPSBnbG9iYWwucXVlcnkoXCIubmF2X2NvbXBvbmVudFwiLCBkb2N1bWVudCk7XHJcbmNvbnN0IGZlYXR1cmVzQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uZmVhdHVyZXNcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBkYXRhQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uZGF0YVwiLCBkb2N1bWVudCk7XHJcbmNvbnN0IHNlcXVlbmNlQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uc2VxdWVuY2VcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBuYXZiYXIgPSBuZXcgTmF2YmFyQ2xhc3MoZ2xvYmFsLCBuYXZDb250YWluZXIpO1xyXG5jb25zdCBmZWF0dXJlcyA9IG5ldyBGZWF0dXJlc0NsYXNzKGdsb2JhbCwgZmVhdHVyZXNDb250YWluZXIpO1xyXG5jb25zdCBkYXRhID0gbmV3IERhdGFDbGFzcyhnbG9iYWwsIGRhdGFDb250YWluZXIpO1xyXG5jb25zdCBzZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZUNsYXNzKGdsb2JhbCwgc2VxdWVuY2VDb250YWluZXIpO1xyXG5jb25zdCBTRUNUSU9OUyA9IHtcclxuICBuYXZiYXI6IG5hdmJhcixcclxuICBmZWF0dXJlczogZmVhdHVyZXMsXHJcbiAgZGF0YTogZGF0YSxcclxuICBzZXF1ZW5jZTogc2VxdWVuY2UsXHJcbn07XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLU5BVi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jbGljay1hY3Rpb25dXCIpO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQubmF2U2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgLy8xLiBHZW5lcmljIGNsZWFudXBcclxuICBpZiAoXCJpc0Ryb3Bkb3duSWNvblwiIGluIGNsaWNrZWQuZGF0YXNldCkge1xyXG4gICAgLy8gUG9seW1vcnBoaWMgY2FsbCBvbmx5IC0ganVzdCB0b2dnbGluZyBkcm9wZG93blxyXG4gICAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vZG9udCBmbGFzaCBpZiBvbmx5IGNsaWNraW5nIGRyb3Bkb3duXHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgLy8yLiBTdGF0ZSB1cGRhdGVcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihhY3RpdmVTZWN0aW9uKTtcclxuICAvLzMuIFBvbHltb3JwaGljIGNhbGxcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgbmF2YmFyLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG4vL0N1c3RvbSBldmVudDogbmF2IGRyb3Bkb3duIGljb24gY2xpY2tlZFxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3Bkb3duSWNvbkNsaWNrZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS5kZXRhaWw7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgbmF2YmFyLnRvZ2dsZU5hdkRyb3Bkb3duKGNsaWNrZWQpO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IG5hdiBkcm9wZG93biBvcHQgY2xpY2tlZFxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3Bkb3duT3B0Q2xpY2tlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLmRldGFpbDtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBuYXZiYXIuY2xvc2VOYXZEcm9wZG93bihjbGlja2VkKTtcclxuICBuYXZiYXIuY2xvc2VNb2JpbGVOYXZNZW51KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1NQUlOIEJPRFkuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5jbGlja0FjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gaG92ZXJlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW92ZXJBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW91dC1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIC8vIElmIHRoZSBtb3VzZSBtb3ZlZCB0byBhIGNoaWxkIG9mIHRoZSBzYW1lIGJ1dHRvbiwgZG9uJ3QgdHJpZ2dlciB0aGUgXCJFeGl0XCJcclxuICBpZiAoaG92ZXJlZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSByZXR1cm47XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBudWxsO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tVklEUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vdmlkIGVuZGVkXHJcbmdsb2JhbC5hbGxWaWRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zdCBlbmRlZFZpZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudmlkXCIpO1xyXG4gICAgaWYgKCFlbmRlZFZpZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdmlkU2VjdGlvbiA9IGVuZGVkVmlkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1t2aWRTZWN0aW9uXTtcclxuICAgIHRhcmdldE1vZHVsZS52aWRFbmQoKTtcclxuICB9KTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXRcclxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICBzZXR1cExhenlMb2FkaW5nKCk7XHJcbiAgZ2xvYmFsLnNldFdlYmZsb3dCcmVha3BvaW50KCk7XHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgbmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihcImZlYXR1cmVzXCIpO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBmZWF0dXJlcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGZlYXR1cmVzLmluaXRTZWN0aW9uKG51bGwsIChpc0ludHJvID0gdHJ1ZSkpO1xyXG4gIH0sIFRJTUlORy5VSS5TVEFSVF9VSV9SRVZFQUwpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbn07XHJcbmNvbnN0IHNldHVwTGF6eUxvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgYWxsTGF6eVZpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKTtcclxuICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XHJcbiAgICByb290OiBudWxsLFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHhcIixcclxuICAgIHRocmVzaG9sZDogMC4xLFxyXG4gIH07XHJcbiAgY29uc3QgdmlkZW9PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCB2aWRlbyA9IGVudHJ5LnRhcmdldDtcclxuICAgICAgY29uc3Qgc291cmNlcyA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzb3VyY2VcIik7XHJcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgIC8vIC0tLSBMT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBVc2UgZGF0YS1zcmMgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2Uga2VlcCBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSB8fCBzb3VyY2Uuc3JjO1xyXG4gICAgICAgICAgaWYgKGRhdGFTcmMpIHtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IGRhdGFTcmM7XHJcbiAgICAgICAgICAgIC8vIEtlZXAgZGF0YS1zcmMgYXR0cmlidXRlIHNvIHdlIGNhbiBmaW5kIHRoZSBVUkwgYWdhaW4gbGF0ZXJcclxuICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIsIGRhdGFTcmMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAtLS0gVU5MT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIC8vIENsZWFycyB0aGUgaW50ZXJuYWwgbG9ncyBmb3IgdXNlciBpbnRlcmFjdGlvbnMgYW5kIHJlc291cmNlIGxvYWRzXHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcygpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyUmVzb3VyY2VUaW1pbmdzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcygpO1xyXG4gICAgICAgIFJlc2V0U2VjdGlvbih2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikpO1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIE1vdmUgc3JjIGJhY2sgdG8gZGF0YS1zcmMgYW5kIGVtcHR5IHRoZSBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudFNyYyA9IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoY3VycmVudFNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgY3VycmVudFNyYyk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBcIlwiOyAvLyBUaGlzIHN0b3BzIHRoZSB2aWRlbyBmcm9tIGJ1ZmZlcmluZ1xyXG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlQXR0cmlidXRlKFwic3JjXCIpOyAvLyBGdWxseSBjbGVhciBhdHRyaWJ1dGVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgYnJvd3NlciB0byBkdW1wIHRoZSB2aWRlbyBkYXRhIGZyb20gbWVtb3J5XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBvYnNlcnZlck9wdGlvbnMpO1xyXG4gIGFsbExhenlWaWRzLmZvckVhY2goKHZpZCkgPT4gdmlkZW9PYnNlcnZlci5vYnNlcnZlKHZpZCkpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL1JFU0VUIFZJRFMgQUZURVIgVU5MT0FESU5HLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgY29uc3QgUmVzZXRTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICAgIGlmICghc2VjdGlvbikgcmV0dXJuOyAvL2hlbHBzIHByZXZlbnQgY3Jhc2hlc1xyXG4gICAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgIGVsLnBhdXNlKCk7XHJcbiAgICB9KTtcclxuICAgIGdsb2JhbC5kZWFjdGl2YXRlQ3VycmVudEJ0bnMoc2VjdGlvbik7XHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7QUFBTyxNQUFNLFNBQVMsT0FBTyxPQUFPO0FBQUEsSUFDbEMsSUFBSTtBQUFBLE1BQ0YsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0YsQ0FBQztBQUNNLE1BQU0sU0FBUyxPQUFPLE9BQU87QUFBQSxJQUNsQyxVQUFVO0FBQUEsTUFDUixTQUNFO0FBQUEsTUFDRixRQUNFO0FBQUEsSUFDSjtBQUFBLEVBQ0YsQ0FBQztBQUNNLE1BQU0saUJBQWlCLE9BQU8sT0FBTztBQUFBLElBQzFDLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRixDQUFDOzs7QUN2QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLE1BQU0sY0FBYyxTQUFTLGNBQWMsZUFBZTtBQUMxRCxNQUFNLFdBQVcsU0FBUyxjQUFjLFdBQVc7QUFDbkQsTUFBTSxjQUFjLENBQUMsR0FBRyxTQUFTLGlCQUFpQixVQUFVLENBQUM7QUFDN0QsTUFBTSxjQUFjLFNBQVMsaUJBQWlCLFdBQVc7QUFDekQsTUFBTSxVQUFVLFNBQVMsaUJBQWlCLE1BQU07QUFDaEQsTUFBTSxVQUFVLFNBQVMsY0FBYyxXQUFXO0FBQ2xELE1BQU0sa0JBQWtCLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUNsRSxNQUFNLFNBQVMsU0FBUyxjQUFjLGFBQWE7QUFDbkQsTUFBTSxTQUFTO0FBQUEsSUFDcEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIsV0FBVztBQUFBLElBQ1gsbUJBQW1CO0FBQUEsSUFDbkIsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLEVBQ2I7QUFJTyxNQUFNLFFBQVEsU0FBVSxVQUFVLFVBQVUsVUFBVTtBQUMzRCxVQUFNLEtBQUssUUFBUSxjQUFjLFFBQVE7QUFDekMsUUFBSSxDQUFDLElBQUk7QUFDUCxZQUFNLElBQUk7QUFBQSxRQUNSLHVCQUF1QixRQUFRO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFTyxNQUFNLFdBQVcsU0FBVSxVQUFVLFVBQVUsVUFBVTtBQUM5RCxVQUFNLFdBQVcsUUFBUSxpQkFBaUIsUUFBUTtBQUNsRCxRQUFJLFNBQVMsV0FBVyxHQUFHO0FBQ3pCLFlBQU0sSUFBSTtBQUFBLFFBQ1IsNENBQTRDLFFBQVE7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNPLE1BQU0sYUFBYSxTQUFVLE9BQU87QUFDekMsV0FBTyxNQUFNLFFBQVEsVUFBVSxFQUFFLFVBQVUsQ0FBQztBQUFBLEVBQzlDO0FBQ08sTUFBTSxnQkFBZ0IsV0FBWTtBQUN2QyxhQUFTLFVBQVUsSUFBSSxRQUFRO0FBQy9CLGVBQVcsV0FBWTtBQUNyQixlQUFTLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDcEMsR0FBRyxPQUFPLEdBQUcsY0FBYztBQUFBLEVBQzdCO0FBQ08sTUFBTSwwQkFBMEIsV0FBWTtBQUNqRCxZQUFRLE1BQU0sZ0JBQWdCO0FBQzlCLFdBQU8sTUFBTSxnQkFBZ0I7QUFBQSxFQUMvQjtBQUNPLE1BQU0seUJBQXlCLFNBQVUsU0FBUztBQUN2RCw4QkFBMEI7QUFDMUIsWUFBUSxVQUFVLElBQUksU0FBUztBQUFBLEVBQ2pDO0FBQ08sTUFBTSw0QkFBNEIsV0FBWTtBQUNuRCxvQkFBZ0IsUUFBUSxTQUFVLElBQUk7QUFDcEMsU0FBRyxVQUFVLE9BQU8sU0FBUztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxtQkFBbUIsU0FBVSxhQUFhLE9BQU87QUFDNUQsMEJBQXNCO0FBQ3RCLFdBQU8sb0JBQW9CO0FBQzNCLFFBQUksQ0FBQyxNQUFPLFNBQVE7QUFDcEIsVUFBTSxVQUFVLFlBQVk7QUFBQSxNQUMxQixDQUFDLE9BQU8sR0FBRyxRQUFRLFlBQVk7QUFBQSxJQUNqQztBQUNBLFVBQU0sU0FBUyxRQUFRLEtBQUs7QUFDNUIsUUFBSSxRQUFRO0FBQ1YsYUFBTyxVQUFVLElBQUksUUFBUTtBQUM3QixhQUFPLGdCQUFnQjtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUNPLE1BQU0sd0JBQXdCLFdBQVk7QUFDL0MsZ0JBQVksUUFBUSxTQUFVLElBQUk7QUFDaEMsU0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzlCLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxlQUFlLFdBQVk7QUFDdEMsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFDTyxNQUFNLGVBQWUsU0FBVSxlQUFlLG9CQUFvQjtBQUN2RSxRQUFJLE9BQU8sV0FBVztBQUNwQixhQUFPLFVBQVUsTUFBTTtBQUN2QixhQUFPLFVBQVUsTUFBTTtBQUFBLElBQ3pCO0FBQ0EsUUFBSSxpQkFBaUIsdUJBQXVCLE1BQU07QUFDaEQsb0JBQWMsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTztBQUMxRCxZQUFJLEdBQUcsY0FBYyxNQUFNLEVBQUUsaUJBQWlCLE1BQU07QUFDbEQsaUJBQU8sWUFBWSxHQUFHLGNBQWMsTUFBTTtBQUFBLFFBQzVDO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxXQUFXLGlCQUFpQixvQkFBb0I7QUFDOUMsb0JBQWMsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTztBQUMxRCxZQUNFLEdBQUcsUUFBUSxTQUFTLHNCQUNwQixHQUFHLGNBQWMsTUFBTSxFQUFFLGlCQUFpQixNQUMxQztBQUNBLGlCQUFPLFlBQVksR0FBRyxjQUFjLE1BQU07QUFBQSxRQUM1QztBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsT0FBTztBQUNMLGtCQUFZLFFBQVEsQ0FBQyxPQUFPO0FBQzFCLFlBQUksR0FBRyxjQUFjLE1BQU0sRUFBRSxpQkFBaUIsTUFBTTtBQUNsRCxpQkFBTyxZQUFZLEdBQUcsY0FBYyxNQUFNO0FBQUEsUUFDNUM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNPLE1BQU0sdUJBQXVCLFdBQVk7QUFDOUMsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFDTyxNQUFNLHVCQUF1QixXQUFZO0FBQzlDLFVBQU0sUUFBUSxPQUFPO0FBQ3JCLFFBQUksUUFBUSxJQUFLLFFBQU8sb0JBQW9CO0FBQzVDLFFBQUksU0FBUyxJQUFLLFFBQU8sb0JBQW9CO0FBQzdDLFFBQUksU0FBUyxJQUFLLFFBQU8sb0JBQW9CO0FBQzdDLFFBQUksU0FBUyxJQUFLLFFBQU8sb0JBQW9CO0FBQUEsRUFDL0M7QUFDTyxNQUFNLGVBQWUsU0FBVSxVQUFVO0FBQzlDLFdBQU8sWUFBWTtBQUFBLEVBQ3JCO0FBQ08sTUFBTSxhQUFhLFNBQVUsVUFBVTtBQUM1QyxXQUFPLFVBQVU7QUFBQSxFQUNuQjtBQUNPLE1BQU0scUJBQXFCLFdBQVk7QUFDNUMsV0FBTyxjQUFjLGlCQUFpQixNQUFNLEVBQUUsUUFBUSxTQUFVLElBQUk7QUFDbEUsU0FBRyxNQUFNO0FBQ1QsU0FBRyxLQUFLO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUNPLE1BQU0sc0JBQXNCLFdBQVk7QUFDN0MsV0FBTyxjQUFjLGlCQUFpQixNQUFNLEVBQUUsUUFBUSxTQUFVLElBQUk7QUFDbEUsU0FBRyxjQUFjO0FBQ2pCLFNBQUcsTUFBTTtBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFDTyxNQUFNLFlBQVksU0FBVSxrQkFBa0I7QUFDbkQsUUFBSSxDQUFDLE9BQU8sVUFBVztBQUN2QixVQUFNLFVBQVUsT0FBTyxVQUFVO0FBQ2pDLFVBQU0sY0FBYyxvQkFBb0IsT0FBTztBQUUvQyxRQUFJLE9BQU8sVUFBVSxpQkFBaUI7QUFDcEMsYUFBTyxVQUFVO0FBQUEsUUFDZjtBQUFBLFFBQ0EsT0FBTyxVQUFVO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUEsUUFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBRXJDLFdBQU8sVUFBVTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLE9BQU8sVUFBVTtBQUFBLElBQ25CO0FBQ0EsVUFBTSxjQUFjLE1BQU07QUFDeEIsVUFBSSxPQUFPLFVBQVUsZUFBZSxPQUFPLFVBQVUsTUFBTTtBQUN6RCxlQUFPLFVBQVUsb0JBQW9CLGNBQWMsV0FBVztBQUM5RCxlQUFPLFVBQVUsTUFBTTtBQUN2QixlQUFPLFVBQVUsY0FBYyxPQUFPO0FBQ3RDLGVBQU8sVUFBVSxjQUFjLElBQUksTUFBTSxPQUFPLENBQUM7QUFBQSxNQUNuRDtBQUFBLElBQ0Y7QUFDQSxXQUFPLFVBQVUsa0JBQWtCO0FBRW5DLFVBQU0sU0FBUyxPQUFPLFVBQVUsY0FBYyxRQUFRO0FBQ3RELFVBQU0sVUFBVSxTQUFTLE9BQU8sYUFBYSxVQUFVLElBQUk7QUFDM0QsUUFBSSxXQUFXLE9BQU8sVUFBVSxRQUFRLFNBQVM7QUFDL0MsYUFBTyxVQUFVLE1BQU07QUFDdkIsYUFBTyxVQUFVLE1BQU07QUFDdkIsYUFBTyxVQUFVLEtBQUs7QUFBQSxJQUN4QjtBQUNBLFVBQU0sd0JBQXdCLFlBQVk7QUFDeEMsVUFBSTtBQUNGLGVBQU8sVUFBVSxjQUFjO0FBSS9CLGNBQU0sZUFBZSxNQUFNO0FBQ3pCLGNBQUksT0FBTyxVQUFVLGNBQWMsYUFBYTtBQUU5QyxrQ0FBc0IsTUFBTTtBQUMxQixvQ0FBc0IsTUFBTTtBQUMxQixvQkFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBQ3JDLG9CQUFJLE9BQU8sYUFBYTtBQUN0QiwyQkFBUyxVQUFVLE9BQU8sUUFBUTtBQUFBLGNBQ3RDLENBQUM7QUFBQSxZQUNILENBQUM7QUFBQSxVQUNILFdBQVcsQ0FBQyxPQUFPLFVBQVUsUUFBUTtBQUVuQyxrQ0FBc0IsWUFBWTtBQUFBLFVBQ3BDO0FBQUEsUUFDRjtBQUVBLGVBQU8sVUFBVSxpQkFBaUIsY0FBYyxXQUFXO0FBQzNELGNBQU0sT0FBTyxVQUFVLEtBQUs7QUFDNUIscUJBQWE7QUFBQSxNQUNmLFNBQVMsR0FBRztBQUNWLGdCQUFRLEtBQUssb0JBQW9CLENBQUM7QUFFbEMsWUFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBRUEsUUFBSSxPQUFPLFVBQVUsY0FBYyxHQUFHO0FBQ3BDLDRCQUFzQjtBQUFBLElBQ3hCLE9BQU87QUFDTCxhQUFPLFVBQVUsaUJBQWlCLFdBQVcsdUJBQXVCO0FBQUEsUUFDbEUsTUFBTTtBQUFBLE1BQ1IsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ08sTUFBTSxlQUFlLFdBQVk7QUFDdEMsV0FBTyxZQUFZO0FBQ25CLFdBQU8sY0FBYyxjQUFjLGFBQWEsRUFBRSxNQUFNLGdCQUN0RDtBQUFBLEVBQ0o7QUFDTyxNQUFNLGNBQWMsV0FBWTtBQUNyQyxXQUFPLGNBQWMsY0FBYyxhQUFhLEVBQUUsTUFBTSxnQkFDdEQ7QUFBQSxFQUNKO0FBQ08sTUFBTSxjQUFjLFdBQVk7QUFDckMsUUFBSSxPQUFPLFdBQVc7QUFDcEIsYUFBTyxZQUFZO0FBQ25CLGFBQU8sVUFBVSxLQUFLO0FBQUEsSUFDeEIsT0FBTztBQUNMLGFBQU8sWUFBWTtBQUNuQixhQUFPLFVBQVUsTUFBTTtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUNPLE1BQU0sNkJBQTZCLFdBQVk7QUFDcEQsV0FBTyxjQUFjLGNBQWMsb0JBQW9CLEVBQUUsTUFBTSxnQkFDN0Q7QUFBQSxFQUNKO0FBQ08sTUFBTSw4QkFBOEIsV0FBWTtBQUNyRCxXQUFPLGNBQWMsY0FBYyxvQkFBb0IsRUFBRSxNQUFNLGdCQUM3RDtBQUFBLEVBQ0o7QUFDTyxNQUFNLDBCQUEwQixTQUFVLGlCQUFpQjtBQUNoRSxpQ0FBNkI7QUFDN0IsV0FBTyxjQUNKLGlCQUFpQixvQkFBb0IsRUFDckMsUUFBUSxTQUFVLElBQUksT0FBTztBQUM1QixVQUFJLFVBQVUsaUJBQWlCO0FBQzdCLFdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUMzQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0w7QUFDTyxNQUFNLCtCQUErQixXQUFZO0FBQ3RELFdBQU8sY0FDSixpQkFBaUIsb0JBQW9CLEVBQ3JDLFFBQVEsU0FBVSxJQUFJO0FBQ3JCLFNBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDTDtBQUNPLE1BQU0sc0JBQXNCLFNBQVUsS0FBSztBQUNoRCxRQUFJLE9BQU8sYUFBYSxPQUFPLHNCQUFzQjtBQUNuRCxVQUFJLFVBQVUsT0FBTyxTQUFTO0FBQUEsRUFDbEM7QUFDTyxNQUFNLHFCQUFxQixTQUFVLEtBQUs7QUFDL0MsMEJBQXNCO0FBQ3RCLGVBQVcsTUFBTTtBQUNmLFVBQUksVUFBVSxJQUFJLFNBQVM7QUFBQSxJQUM3QixHQUFHLEVBQUU7QUFBQSxFQUNQO0FBQ08sTUFBTSx3QkFBd0IsU0FBVSxTQUFTO0FBQ3RELFFBQUksQ0FBQyxRQUFTLFdBQVUsT0FBTztBQUMvQixZQUFRLGlCQUFpQixXQUFXLEVBQUUsUUFBUSxTQUFVLElBQUk7QUFDMUQsU0FBRyxVQUFVLE9BQU8sU0FBUztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxnQkFBZ0IsU0FBVSxLQUFLLFVBQVUsZ0JBQWdCO0FBQ3BFLFFBQUk7QUFDSixVQUFNLFVBQVUsSUFDYixRQUFRLElBQUksY0FBYyxFQUFFLEVBQzVCLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtBQUNsQyxZQUFRLFFBQVEsU0FBVSxJQUFJLE9BQU87QUFDbkMsVUFBSSxPQUFPLElBQUssY0FBYTtBQUFBLElBQy9CLENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVDs7O0FDNVJBLE1BQU0sU0FBTixNQUFhO0FBQUEsSUFDWCxZQUFZLGtCQUFrQixXQUFXO0FBQ3ZDLFdBQUssU0FBUztBQUNkLFdBQUssWUFBWTtBQUdqQixXQUFLLFVBQVUsS0FBSyxPQUFPLE1BQU0sYUFBYSxLQUFLLFNBQVM7QUFDNUQsV0FBSyxTQUFTLEtBQUssT0FBTyxNQUFNLGVBQWUsS0FBSyxTQUFTO0FBQzdELFdBQUssY0FBYyxLQUFLLE9BQU8sU0FBUyxrQkFBa0IsS0FBSyxTQUFTO0FBQ3hFLFdBQUssMEJBQTBCO0FBQUEsUUFDN0IsR0FBRyxLQUFLLE9BQU8sU0FBUyxpQ0FBaUMsS0FBSyxTQUFTO0FBQUEsTUFDekU7QUFDQSxXQUFLLGtCQUFrQjtBQUFBLFFBQ3JCLEdBQUcsS0FBSyxPQUFPLFNBQVMsc0JBQXNCLEtBQUssU0FBUztBQUFBLE1BQzlEO0FBQ0EsV0FBSyxXQUFXLG9CQUFJLElBQUk7QUFBQSxRQUN0QixDQUFDLHFCQUFxQixLQUFLLGVBQWU7QUFBQSxRQUMxQyxDQUFDLHNCQUFzQixLQUFLLGdCQUFnQjtBQUFBLFFBQzVDLENBQUMsdUJBQXVCLEtBQUssaUJBQWlCO0FBQUEsTUFDaEQsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBO0FBQUEsSUFHQSxjQUFjLFNBQVUsU0FBUyxhQUFhO0FBQzVDLFlBQU0sU0FBUyxLQUFLLFNBQVMsSUFBSSxXQUFXO0FBQzVDLFVBQUksUUFBUTtBQUNWLGVBQU8sT0FBTztBQUFBLE1BQ2hCLE9BQU87QUFDTCxnQkFBUSxLQUFLLHdCQUF3QixXQUFXLEVBQUU7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWUsV0FBWTtBQUN6QixXQUFLLGdCQUFnQixRQUFRLFNBQVUsSUFBSTtBQUN6QyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLHFCQUFxQixXQUFZO0FBQy9CLFVBQUksaUJBQWlCLEtBQUssUUFBUSxRQUFTLE1BQUssT0FBTyxNQUFNO0FBQzdELFdBQUssUUFBUSxjQUFjLG9CQUFvQixFQUFFLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDNUU7QUFBQSxJQUNBLGtCQUFrQixTQUFVLFNBQVM7QUFDbkMsY0FDRyxRQUFRLHFCQUFxQixFQUM3QixjQUFjLG9CQUFvQixFQUNsQyxVQUFVLElBQUksUUFBUTtBQUFBLElBQzNCO0FBQUEsSUFDQSxtQkFBbUIsU0FBVSxTQUFTO0FBQ3BDLGNBQ0csUUFBUSxxQkFBcUIsRUFDN0IsY0FBYyxvQkFBb0IsRUFDbEMsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QjtBQUFBLElBQ0Esb0JBQW9CLFNBQVUsU0FBUztBQUNyQyxXQUFLLE9BQU8sdUJBQXVCLE9BQU87QUFDMUMsY0FDRyxRQUFRLHFCQUFxQixFQUM3QixjQUFjLG9CQUFvQixFQUNsQyxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUNBLE1BQU8saUJBQVE7OztBQzFEZixNQUFNLFdBQU4sTUFBZTtBQUFBLElBQ2IsWUFBWSxrQkFBa0IsV0FBVztBQUN2QyxXQUFLLFNBQVM7QUFDZCxXQUFLLFlBQVk7QUFHakIsV0FBSyxtQkFBbUIsS0FBSyxPQUFPLE1BQU0sYUFBYSxLQUFLLFNBQVM7QUFDckUsV0FBSyxrQkFBa0I7QUFBQSxRQUNyQixHQUFHLEtBQUssT0FBTyxTQUFTLGFBQWEsS0FBSyxTQUFTO0FBQUEsTUFDckQ7QUFDQSxXQUFLLHNCQUFzQjtBQUFBLFFBQ3pCLEdBQUcsS0FBSyxPQUFPLFNBQVMsYUFBYSxLQUFLLFNBQVM7QUFBQSxNQUNyRDtBQUNBLFdBQUssc0JBQXNCLEtBQUssT0FBTztBQUFBLFFBQ3JDO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUDtBQUNBLFdBQUssaUJBQWlCLEtBQUssT0FBTztBQUFBLFFBQ2hDO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUDtBQUNBLFdBQUssZUFBZSxLQUFLLE9BQU8sTUFBTSxlQUFlLEtBQUssU0FBUztBQUNuRSxXQUFLLG1CQUFtQixLQUFLLE9BQU87QUFBQSxRQUNsQztBQUFBLFFBQ0EsS0FBSztBQUFBLE1BQ1A7QUFDQSxXQUFLLGdCQUFnQjtBQUNyQixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsaUJBQWlCLEtBQUssV0FBVztBQUFBLFFBQ2xDLENBQUMsaUJBQWlCLEtBQUssY0FBYztBQUFBLFFBQ3JDLENBQUMsa0JBQWtCLEtBQUssWUFBWTtBQUFBLFFBQ3BDLENBQUMsZUFBZSxLQUFLLE9BQU8sb0JBQW9CLEtBQUssSUFBSSxDQUFDO0FBQUEsTUFDNUQsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBO0FBQUEsSUFHQSxjQUFjLENBQUMsU0FBU0EsYUFBWTtBQUNsQyxXQUFLLE9BQU8sU0FBUyxVQUFVLE9BQU8sUUFBUTtBQUM5QyxXQUFLLGlCQUFpQixVQUFVLE9BQU8sUUFBUTtBQUMvQyxXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxPQUFPLGFBQWE7QUFDekIsVUFBSSxTQUFTO0FBQ1gsYUFBSyxPQUFPLHVCQUF1QixPQUFPO0FBQzFDLGFBQUssT0FBTyxjQUFjO0FBQUEsTUFDNUI7QUFDQSxXQUFLLE9BQU8sMkJBQTJCO0FBQ3ZDLFdBQUssWUFBWTtBQUNqQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxpQkFBaUIsVUFBVSxJQUFJLFFBQVE7QUFDNUMsVUFBSUEsU0FBUztBQUNiLFdBQUssa0JBQWtCO0FBQUEsSUFDekI7QUFBQSxJQUNBLGNBQWMsQ0FBQyxTQUFTLGdCQUFnQjtBQUN0QyxZQUFNLFNBQVMsS0FBSyxTQUFTLElBQUksV0FBVztBQUM1QyxVQUFJLFFBQVE7QUFDVixlQUFPLE9BQU87QUFBQSxNQUNoQixPQUFPO0FBQ0wsZ0JBQVEsS0FBSyx3QkFBd0IsV0FBVyxFQUFFO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjLE1BQU07QUFDbEIsV0FBSyxnQkFBZ0IsUUFBUSxTQUFVLElBQUk7QUFDekMsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxnQkFBZ0IsTUFBTTtBQUNwQixXQUFLLGdCQUNGLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxnQkFBZ0IsT0FBTyxFQUMvQyxVQUFVLElBQUksUUFBUTtBQUFBLElBQzNCO0FBQUEsSUFDQSxrQkFBa0IsTUFBTTtBQUN0QixXQUFLLGdCQUNGLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxnQkFBZ0IsS0FBSyxhQUFhLEVBQzFELFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDM0I7QUFBQSxJQUNBLDBCQUEwQixNQUFNO0FBQzlCLFdBQUssb0JBQW9CLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDakQ7QUFBQSxJQUNBLDBCQUEwQixNQUFNO0FBQzlCLFdBQUssb0JBQW9CLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDcEQ7QUFBQSxJQUNBLHFCQUFxQixDQUFDLFlBQVk7QUFDaEMsV0FBSyxvQkFBb0IsUUFBUSxDQUFDLE9BQU87QUFDdkMsWUFBSSxHQUFHLFVBQVUsU0FBUyxPQUFPLEVBQUc7QUFDcEMsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUM1QixZQUFJLEdBQUcsUUFBUSxZQUFZLFNBQVM7QUFDbEMsZUFBSyxnQkFBZ0I7QUFDckIsZUFBSyxjQUFjLFVBQVUsSUFBSSxRQUFRO0FBQUEsUUFDM0M7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxxQkFBcUIsTUFBTTtBQUN6QixXQUFLLG9CQUFvQixRQUFRLENBQUMsT0FBTztBQUN2QyxZQUFJLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRztBQUNwQyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLG9CQUFvQixNQUFNO0FBQ3hCLFdBQUssaUJBQWlCLFVBQVUsT0FBTyxRQUFRO0FBQy9DLFdBQUssd0JBQXdCO0FBQzdCLFdBQUssbUJBQW1CO0FBRXhCLFlBQU0sWUFDSixLQUFLLG9CQUFvQixpQkFBaUIsaUJBQWlCO0FBQzdELGdCQUFVLFFBQVEsQ0FBQyxPQUFPO0FBRXhCLFlBQUksR0FBRyxpQkFBaUIsTUFBTTtBQUM1QixnQkFBTSxNQUFNLEdBQUcsY0FBYyxZQUFZO0FBQ3pDLGNBQUksS0FBSztBQUNQLGdCQUFJLGNBQWM7QUFDbEIsZ0JBQUksS0FBSztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsaUJBQWlCLENBQUMsbUJBQW1CO0FBQ25DLFdBQUssb0JBQW9CO0FBQ3pCLFdBQUssT0FBTyxhQUFhO0FBQ3pCLFdBQUssT0FBTyxZQUFZO0FBQ3hCLFdBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUMzQyxXQUFLLHdCQUF3QjtBQUM3QixXQUFLLG1CQUFtQixlQUFlLFFBQVEsT0FBTztBQUN0RCxXQUFLLGdCQUFnQixlQUFlLFFBQVE7QUFDNUMsV0FBSyx5QkFBeUI7QUFDOUIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssT0FBTyxhQUFhLEtBQUssZUFBZSxJQUFJO0FBQ2pELFdBQUssT0FBTyxhQUFhLGVBQWUsUUFBUSxTQUFTO0FBQ3pELFdBQUssT0FBTyxXQUFXLGVBQWUsUUFBUSxPQUFPO0FBQ3JELFdBQUssT0FBTyxtQkFBbUIsY0FBYztBQUM3QyxXQUFLLE9BQU8sU0FBUyxVQUFVLElBQUksUUFBUTtBQUMzQyxXQUFLLE9BQU8sVUFBVTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxlQUFlLE1BQU07QUFDbkIsV0FBSyxPQUFPLFlBQVk7QUFDeEIsV0FBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDN0M7QUFBQSxJQUNBLFNBQVMsTUFBTTtBQUNiLFVBQUksS0FBSywyQkFBMkIsT0FBTztBQUN6QyxhQUFLLE9BQU8sNEJBQTRCO0FBQ3hDLGFBQUssT0FBTyxhQUFhO0FBQ3pCLGFBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUMzQyxhQUFLLGdCQUFnQixXQUFXLE1BQU07QUFDcEMsZUFBSyxpQkFBaUIsVUFBVSxJQUFJLFFBQVE7QUFDNUMscUJBQVcsTUFBTTtBQUNmLGlCQUFLLFlBQVk7QUFDakIsaUJBQUssY0FBYztBQUNuQixpQkFBSyxPQUFPLG9CQUFvQjtBQUNoQyxpQkFBSyxPQUFPLHNCQUFzQjtBQUNsQyxpQkFBSyxPQUFPLHdCQUF3QjtBQUNwQyxpQkFBSyxPQUFPLDJCQUEyQjtBQUN2QyxpQkFBSyxrQkFBa0I7QUFBQSxVQUN6QixHQUFHLE9BQU8sR0FBRyx1QkFBdUI7QUFBQSxRQUN0QyxHQUFHLE9BQU8sTUFBTSxhQUFhO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBc0IsTUFBTTtBQUMxQixXQUFLLHlCQUF5QjtBQUM5QixtQkFBYSxLQUFLLGFBQWE7QUFDL0IsV0FBSyxnQkFBZ0I7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFDQSxNQUFPLG1CQUFROzs7QUN0S2YsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sT0FBTixNQUFXO0FBQUEsSUFDVCxZQUFZLGtCQUFrQixXQUFXO0FBQ3ZDLFdBQUssU0FBUztBQUNkLFdBQUssWUFBWTtBQUdqQixXQUFLLFlBQVksS0FBSyxPQUFPLE1BQU0scUJBQXFCLEtBQUssU0FBUztBQUN0RSxXQUFLLGNBQWMsS0FBSyxPQUFPLE1BQU0sa0JBQWtCLEtBQUssU0FBUztBQUNyRSxXQUFLLGVBQWUsS0FBSyxPQUFPLE1BQU0sa0JBQWtCLEtBQUssU0FBUztBQUN0RSxXQUFLLGlCQUFpQjtBQUFBLFFBQ3BCLEdBQUcsS0FBSyxPQUFPLFNBQVMsbUJBQW1CLEtBQUssU0FBUztBQUFBLE1BQzNEO0FBQ0EsV0FBSyxTQUFTLEtBQUssT0FBTyxNQUFNLFdBQVcsS0FBSyxTQUFTO0FBQ3pELFdBQUssWUFBWSxLQUFLLE9BQU8sTUFBTSxnQkFBZ0IsS0FBSyxTQUFTO0FBQ2pFLFdBQUssb0JBQW9CLEtBQUssT0FBTztBQUFBLFFBQ25DO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUDtBQUNBLFdBQUssa0JBQWtCO0FBQUEsUUFDckIsR0FBRyxLQUFLLE9BQU8sU0FBUywyQkFBMkIsS0FBSyxTQUFTO0FBQUEsTUFDbkU7QUFDQSxXQUFLLFVBQVUsQ0FBQyxHQUFHLEtBQUssT0FBTyxTQUFTLG1CQUFtQixLQUFLLFNBQVMsQ0FBQztBQUMxRSxXQUFLLHFCQUFxQjtBQUFBLFFBQ3hCLEdBQUcsS0FBSyxPQUFPLFNBQVMsc0JBQXNCLEtBQUssU0FBUztBQUFBLE1BQzlEO0FBQ0EsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSyxhQUFhO0FBQ2xCLFdBQUssaUJBQWlCLEVBQUUsTUFBTSxVQUFVLFdBQVcsR0FBRyxTQUFTLEVBQUU7QUFDakUsV0FBSyxjQUFjO0FBQ25CLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssV0FBVztBQUNoQixXQUFLLGtCQUFrQjtBQUN2QixXQUFLLHVCQUF1QixLQUFLLG1CQUFtQixDQUFDO0FBQ3JELFdBQUssWUFBWTtBQUNqQixXQUFLLFVBQVU7QUFDZixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsYUFBYSxLQUFLLFdBQVc7QUFBQSxRQUM5QixDQUFDLGlCQUFpQixLQUFLLG9CQUFvQjtBQUFBLFFBQzNDLENBQUMsaUJBQWlCLEtBQUssaUJBQWlCO0FBQUEsUUFDeEMsQ0FBQyxnQkFBZ0IsS0FBSyxrQkFBa0I7QUFBQSxRQUN4QyxDQUFDLHVCQUF1QixLQUFLLGdCQUFnQjtBQUFBLFFBQzdDLENBQUMsd0JBQXdCLEtBQUssZ0JBQWdCO0FBQUEsUUFDOUMsQ0FBQyxrQkFBa0IsS0FBSyxtQkFBbUI7QUFBQSxRQUMzQyxDQUFDLGVBQWUsS0FBSyxPQUFPLG9CQUFvQixLQUFLLElBQUksQ0FBQztBQUFBLE1BQzVELENBQUM7QUFDRCxXQUFLLFlBQVksb0JBQUksSUFBSTtBQUFBLFFBQ3ZCLENBQUMsVUFBVSxPQUFPLFFBQVEsRUFBRSxPQUFPO0FBQUEsUUFDbkMsQ0FBQyxhQUFhLE9BQU8sUUFBUSxFQUFFLE1BQU07QUFBQSxNQUN2QyxDQUFDO0FBQUEsSUFDSDtBQUFBO0FBQUE7QUFBQSxJQUdBLGNBQWMsQ0FBQyxZQUFZO0FBQ3pCLFdBQUssT0FBTyxjQUFjO0FBRTFCLFdBQUssT0FBTyxVQUFVLE9BQU8sUUFBUTtBQUNyQyxXQUFLLFdBQVc7QUFDaEIsV0FBSyxVQUFVLGNBQWM7QUFDN0IsV0FBSyxZQUFZO0FBQ2pCLFdBQUssWUFBWTtBQUNqQixXQUFLLG1CQUFtQjtBQUN4QixXQUFLLFVBQVUsVUFBVSxJQUFJLFFBQVE7QUFDckMsV0FBSyxtQkFBbUI7QUFDeEIsV0FBSyxPQUFPLHVCQUF1QixPQUFPO0FBRTFDLFdBQUssT0FBTyxtQkFBbUI7QUFDL0IsV0FBSyxrQkFBa0I7QUFDdkIsV0FBSyx3QkFBd0I7QUFBQSxJQUMvQjtBQUFBLElBQ0EsY0FBYyxDQUFDLFNBQVMsZ0JBQWdCO0FBQ3RDLFlBQU0sU0FBUyxLQUFLLFNBQVMsSUFBSSxXQUFXO0FBQzVDLFVBQUksUUFBUTtBQUNWLGVBQU8sT0FBTztBQUFBLE1BQ2hCLE9BQU87QUFDTCxnQkFBUSxLQUFLLHdCQUF3QixXQUFXLEVBQUU7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLG1CQUFtQixNQUFNO0FBQ3ZCLFdBQUssYUFBYSxVQUFVLElBQUksUUFBUTtBQUFBLElBQzFDO0FBQUEsSUFDQSxtQkFBbUIsTUFBTTtBQUN2QixXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM3QztBQUFBLElBQ0Esc0JBQXNCLE1BQU07QUFDMUIsVUFBSSxLQUFLLGFBQWEsU0FBUztBQUM3QixhQUFLLFdBQVc7QUFDaEIsYUFBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQ3JDLGFBQUssZ0JBQWdCLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDaEQsT0FBTztBQUNMLGFBQUssV0FBVztBQUNoQixhQUFLLE9BQU8sVUFBVSxJQUFJLFFBQVE7QUFDbEMsYUFBSyxnQkFBZ0IsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUM3QztBQUNBLFdBQUssa0JBQWtCLGNBQWMsY0FBYyxFQUFFLGNBQ25ELEtBQUs7QUFBQSxJQUNUO0FBQUEsSUFDQSxjQUFjLE1BQU07QUFDbEIsV0FBSywwQkFBMEI7QUFDL0IsV0FBSyxrQkFDRixpQkFBaUIsaUJBQWlCLEVBQ2xDLFFBQVEsU0FBVSxJQUFJO0FBQ3JCLFdBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDTDtBQUFBLElBQ0EsV0FBVyxNQUFNO0FBQ2YsV0FBSyxrQkFBa0IsVUFBVSxJQUFJLFFBQVE7QUFDN0MsV0FBSyxrQkFBa0IsaUJBQWlCLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxPQUFPO0FBQ3pFLFlBQUksR0FBRyxRQUFRLFNBQVMsS0FBSyxjQUFjLFFBQVE7QUFDakQsZUFBSyxrQkFBa0I7QUFBQSxNQUMzQixDQUFDO0FBQ0QsV0FBSyxnQkFBZ0IsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUM3QztBQUFBLElBQ0EsY0FBYyxNQUFNO0FBQ2xCLFdBQUsscUJBQ0YsY0FBYyxnQkFBZ0IsRUFDOUIsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QjtBQUFBLElBQ0EsY0FBYyxNQUFNO0FBQ2xCLFdBQUsscUJBQ0YsaUJBQWlCLFdBQVcsRUFDNUIsUUFBUSxTQUFVLElBQUk7QUFDckIsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFDSCxXQUFLLHFCQUFxQixVQUFVLElBQUksUUFBUTtBQUNoRCxXQUFLLHFCQUNGLGNBQWMsZ0JBQWdCLEVBQzlCLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDM0I7QUFBQSxJQUNBLHFCQUFxQixNQUFNO0FBQ3pCLFdBQUssUUFBUSxRQUFRLFNBQVUsSUFBSTtBQUNqQyxXQUFHLGNBQWMsVUFBVSxJQUFJLFFBQVE7QUFDdkMsV0FBRyxjQUFjLHNCQUFzQixFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3BELFdBQUcsY0FBYyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzVDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxvQkFBb0IsQ0FBQyxhQUFhO0FBQ2hDLFVBQUksQ0FBQyxVQUFVO0FBQ2IsYUFBSyxlQUFlLE9BQU8sS0FBSztBQUFBLE1BQ2xDLE9BQU87QUFDTCxhQUFLLGVBQWUsT0FBTztBQUFBLE1BQzdCO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCLE1BQU07QUFDcEIsV0FBSyxhQUFhLEtBQUssY0FBYyxRQUFRO0FBQUEsSUFDL0M7QUFBQSxJQUNBLGtCQUFrQixNQUFNO0FBQ3RCLFdBQUssWUFBWSxlQUFlLEtBQUssZUFBZSxJQUFJLEVBQUU7QUFDMUQsV0FBSyxVQUFVLGVBQWUsS0FBSyxlQUFlLElBQUksRUFBRTtBQUFBLElBQzFEO0FBQUEsSUFDQSx3QkFBd0IsTUFBTTtBQUM1QixXQUFLLGNBQWM7QUFDbkIsVUFDRSxLQUFLLGVBQWUsU0FBUyxhQUM3QixLQUFLLGVBQWUsV0FDcEI7QUFDQSxhQUFLLGdCQUFnQjtBQUNyQjtBQUFBLE1BQ0Y7QUFDQSxVQUNFLEtBQUssZUFBZSxTQUFTLGFBQzdCLEtBQUssZUFBZSxXQUNwQjtBQUNBLGFBQUssZ0JBQWdCO0FBQ3JCLGFBQUssZ0JBQWdCO0FBQ3JCO0FBQUEsTUFDRjtBQUNBLFdBQUssWUFBWSxLQUFLLGNBQWMsUUFBUTtBQUM1QyxXQUFLLFVBQVUsS0FBSyxjQUFjLFFBQVE7QUFBQSxJQUM1QztBQUFBLElBQ0Esd0JBQXdCLE1BQU07QUFDNUIsV0FBSyxjQUFjO0FBQ25CLFdBQUssWUFBWTtBQUNqQixXQUFLLFlBQVksS0FBSyxjQUFjLFFBQVE7QUFDNUMsV0FBSyxVQUFVLEtBQUssY0FBYyxRQUFRO0FBQUEsSUFDNUM7QUFBQSxJQUNBLG1CQUFtQixNQUFNO0FBQ3ZCLFlBQU0sWUFBWSxLQUFLLE9BQU8sYUFBYTtBQUMzQyxVQUFJLENBQUMsVUFBVztBQUNoQixVQUFJLFNBQVMsS0FBSztBQUNsQixVQUFJLFVBQVUsY0FBYyxVQUFVLFNBQVMsSUFBSSxFQUFHLFdBQVU7QUFDaEUsWUFBTSxRQUFRLEtBQUssVUFBVSxJQUFJLE1BQU07QUFDdkMsZ0JBQVUsYUFBYSxVQUFVLEtBQUs7QUFBQSxJQUN4QztBQUFBLElBQ0EsMEJBQTBCLE1BQU07QUFDOUIsWUFBTSxZQUFZLEtBQUssT0FBTyxhQUFhO0FBQzNDLFVBQUksQ0FBQyxVQUFXO0FBQ2hCLFlBQU0sZ0JBQWdCLFVBQVUsUUFBUSxXQUFXO0FBQ25ELFVBQUksU0FBUyxLQUFLLGVBQWU7QUFDakMsVUFBSSxVQUFVLGNBQWMsVUFBVSxTQUFTLElBQUksRUFBRyxXQUFVO0FBQ2hFLFlBQU0sUUFBUSxLQUFLLFVBQVUsSUFBSSxNQUFNO0FBQ3ZDLG9CQUFjLE1BQU0sa0JBQWtCLFFBQVEsS0FBSztBQUFBLElBQ3JEO0FBQUEsSUFDQSw0QkFBNEIsTUFBTTtBQUNoQyxXQUFLLGdCQUFnQixRQUFRLENBQUMsT0FBTztBQUNuQyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLG9CQUFvQixDQUFDLHVCQUF1QjtBQUUxQyxVQUFJLG1CQUFtQixRQUFRLFNBQVMsS0FBSyxXQUFZO0FBRXpELFdBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUMzQyxXQUFLLFlBQVksY0FBYyxtQkFBbUI7QUFDbEQsV0FBSyxvQkFBb0IsS0FBSyxnQkFBZ0I7QUFBQSxRQUM1QyxDQUFDLE9BQU8sR0FBRyxRQUFRLFNBQVMsbUJBQW1CLFFBQVE7QUFBQSxNQUN6RDtBQUNBLFdBQUssZ0JBQWdCO0FBRXJCLFdBQUssT0FBTyxhQUFhO0FBQ3pCLFdBQUssd0JBQXdCO0FBQzdCLFdBQUssY0FBYztBQUNuQixXQUFLLHdCQUF3QjtBQUU3QixXQUFLLHNCQUFzQjtBQUMzQixXQUFLLFlBQVk7QUFBQSxJQUNuQjtBQUFBLElBQ0EsdUJBQXVCLENBQUMsbUJBQW1CO0FBQ3pDLFdBQUssT0FBTyxhQUFhO0FBQ3pCLFdBQUssa0JBQWtCO0FBQ3ZCLFdBQUssd0JBQXdCO0FBQzdCLFdBQUsseUJBQXlCO0FBQzlCLFdBQUssZ0JBQWdCO0FBRXJCLFdBQUssc0JBQXNCLEtBQUssYUFBYTtBQUM3QyxXQUFLLFlBQVk7QUFBQSxJQUNuQjtBQUFBLElBQ0EsY0FBYyxNQUFNO0FBQ2xCLFdBQUssVUFBVSxVQUFVLE9BQU8sUUFBUTtBQUN4QyxXQUFLLHFCQUFxQixVQUFVLE9BQU8sUUFBUTtBQUNuRCxXQUFLLE9BQU8sYUFBYSxLQUFLLFNBQVM7QUFDdkMsV0FBSyxPQUFPLFdBQVcsS0FBSyxPQUFPO0FBQ25DLFdBQUssT0FBTyxVQUFVO0FBQUEsSUFDeEI7QUFBQSxJQUNBLFNBQVMsTUFBTTtBQWViLFdBQUssT0FBTyxVQUFVLElBQUksUUFBUTtBQUNsQyxXQUFLLGtCQUNGLGNBQWMsY0FBYyxFQUM1QixVQUFVLElBQUksUUFBUTtBQUN6QixXQUFLLFNBQVM7QUFDZCxXQUFLLFlBQVk7QUFFakIsWUFBTSxnQkFBZ0IsS0FBSyxPQUFPLGFBQWEsRUFBRSxRQUFRLFdBQVc7QUFDcEUsVUFBSSxlQUFlO0FBQ2pCLHNCQUFjLE1BQU0sa0JBQWtCO0FBQ3RDLHNCQUFjLE1BQU0sa0JBQWtCO0FBQUEsTUFDeEM7QUFBQSxJQUVGO0FBQUEsSUFDQSxxQkFBcUIsTUFBTTtBQUN6QixXQUFLLE9BQU8sY0FBYztBQUUxQixXQUFLLGtCQUFrQixjQUFjLGNBQWMsRUFBRSxjQUFjO0FBQ25FLFdBQUssV0FBVztBQUNoQixXQUFLLGtCQUNGLGNBQWMsY0FBYyxFQUM1QixVQUFVLE9BQU8sUUFBUTtBQUM1QixXQUFLLFlBQVk7QUFDakIsV0FBSyxtQkFBbUI7QUFDeEIsV0FBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQ3JDLFdBQUssVUFBVSxVQUFVLElBQUksUUFBUTtBQUNyQyxXQUFLLFlBQVk7QUFDakIsV0FBSyxtQkFBbUI7QUFHeEIsV0FBSyx3QkFBd0I7QUFDN0IsV0FBSyxPQUFPLG1CQUFtQjtBQUFBLElBQ2pDO0FBQUEsSUFDQSwyQkFBMkIsTUFBTTtBQUMvQixXQUFLLHFCQUFxQixVQUFVLE9BQU8sUUFBUTtBQUFBLElBQ3JEO0FBQUEsSUFDQSwyQkFBMkIsTUFBTTtBQUMvQixXQUFLLHFCQUFxQixVQUFVLElBQUksUUFBUTtBQUFBLElBQ2xEO0FBQUEsSUFDQSxxQkFBcUIsTUFBTTtBQUN6QixXQUFLLHFCQUFxQixpQkFBaUIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxPQUFPO0FBQ3RFLFdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUMzQixDQUFDO0FBQ0QsV0FBSyxxQkFBcUIsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUNsRDtBQUFBLElBQ0EsMEJBQTBCLE1BQU07QUFDOUIsV0FBSyxPQUFPLDZCQUE2QjtBQUN6QyxXQUFLLHVCQUF1QixLQUFLLG1CQUFtQjtBQUFBLFFBQ2xELENBQUMsT0FBTyxHQUFHLFFBQVEsU0FBUyxLQUFLO0FBQUEsTUFDbkM7QUFBQSxJQUNGO0FBQUEsSUFDQSwrQkFBK0IsTUFBTTtBQUNuQyxXQUFLLG1CQUFtQixRQUFRLENBQUMsT0FBTztBQUN0QyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0EsTUFBTyxlQUFROzs7QUNwVGYsTUFBTSxXQUFOLE1BQWU7QUFBQSxJQUNiLFlBQVksa0JBQWtCLFdBQVc7QUFDdkMsV0FBSyxTQUFTO0FBQ2QsV0FBSyxZQUFZO0FBR2pCLFdBQUssZUFBZSxLQUFLLE9BQU8sTUFBTSxlQUFlLEtBQUssU0FBUztBQUNuRSxXQUFLLGlCQUFpQjtBQUFBLFFBQ3BCLEdBQUcsS0FBSyxPQUFPLFNBQVMsYUFBYSxLQUFLLFNBQVM7QUFBQSxNQUNyRDtBQUNBLFdBQUssY0FBYztBQUFBLFFBQ2pCLEdBQUcsS0FBSyxPQUFPLFNBQVMsbUJBQW1CLEtBQUssU0FBUztBQUFBLE1BQzNEO0FBQ0EsV0FBSyxvQkFBb0I7QUFBQSxRQUN2QixHQUFHLEtBQUssT0FBTyxTQUFTLG1CQUFtQixLQUFLLFNBQVM7QUFBQSxNQUMzRDtBQUNBLFdBQUssaUJBQWlCO0FBQUEsUUFDcEIsR0FBRyxLQUFLLE9BQU8sU0FBUyxhQUFhLEtBQUssU0FBUztBQUFBLE1BQ3JEO0FBQ0EsV0FBSyxxQkFBcUI7QUFBQSxRQUN4QixHQUFHLEtBQUssT0FBTyxTQUFTLHNCQUFzQixLQUFLLFNBQVM7QUFBQSxNQUM5RDtBQUNBLFdBQUssYUFBYTtBQUNsQixXQUFLLGlCQUFpQjtBQUN0QixXQUFLLG1CQUFtQjtBQUV4QixXQUFLLG1CQUFtQjtBQUN4QixXQUFLLHFCQUFxQjtBQUMxQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLHVCQUF1QjtBQUM1QixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsaUJBQWlCLEtBQUssV0FBVztBQUFBLFFBQ2xDLENBQUMsdUJBQXVCLEtBQUsseUJBQXlCO0FBQUEsUUFDdEQsQ0FBQyxpQkFBaUIsS0FBSyxjQUFjO0FBQUEsUUFDckMsQ0FBQyxrQkFBa0IsS0FBSyxZQUFZO0FBQUEsUUFDcEMsQ0FBQyxlQUFlLEtBQUssT0FBTyxvQkFBb0IsS0FBSyxJQUFJLENBQUM7QUFBQSxNQUM1RCxDQUFDO0FBQUEsSUFDSDtBQUFBO0FBQUE7QUFBQSxJQUdBLGNBQWMsQ0FBQyxZQUFZO0FBQ3pCLFdBQUssT0FBTyxjQUFjO0FBQzFCLFdBQUssaUJBQWlCLFFBQVEsUUFBUTtBQUN0QyxXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxPQUFPLGFBQWE7QUFDekIsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxzQkFBc0I7QUFDM0IsV0FBSywyQkFBMkI7QUFLaEMsV0FBSywyQkFBMkI7QUFDaEMsV0FBSyx5QkFBeUIsb0JBQUksSUFBSTtBQUN0QyxZQUFNLFFBQVEsS0FBSyxpQkFBaUIsaUJBQWlCLFdBQVc7QUFDaEUsWUFBTSxRQUFRLENBQUMsT0FBTztBQUNwQixhQUFLLHVCQUF1QixJQUFJLEdBQUcsUUFBUSxJQUFJO0FBQUEsTUFDakQsQ0FBQztBQUNELFdBQUssK0JBQStCO0FBQ3BDLFdBQUssaUJBQ0YsY0FBYyxpQkFBaUIsRUFDL0IsVUFBVSxJQUFJLFFBQVE7QUFDekIsVUFBSSxDQUFDLEtBQUssWUFBWTtBQUNwQixhQUFLLE9BQU8sdUJBQXVCLE9BQU87QUFBQSxNQUM1QyxPQUFPO0FBQ0wsYUFBSyxPQUFPO0FBQUEsVUFDVixRQUFRLFFBQVEscUJBQXFCLEVBQUUsY0FBYyxnQkFBZ0I7QUFBQSxRQUN2RTtBQUNBLGVBQU87QUFBQSxVQUNMLElBQUksWUFBWSxzQkFBc0IsRUFBRSxRQUFRLFFBQVEsQ0FBQztBQUFBLFFBQzNEO0FBQ0EsYUFBSyxhQUFhO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjLENBQUMsU0FBUyxnQkFBZ0I7QUFDdEMsWUFBTSxTQUFTLEtBQUssU0FBUyxJQUFJLFdBQVc7QUFDNUMsVUFBSSxRQUFRO0FBQ1YsZUFBTyxPQUFPO0FBQUEsTUFDaEIsT0FBTztBQUNMLGdCQUFRLEtBQUssd0JBQXdCLFdBQVcsRUFBRTtBQUFBLE1BQ3BEO0FBQUEsSUFDRjtBQUFBLElBQ0EsNEJBQTRCLENBQUMsWUFBWTtBQUN2QyxVQUFJLG9CQUFvQixRQUFRLFNBQVM7QUFDdkMsZUFBTztBQUFBLFVBQ0wsSUFBSSxZQUFZLHVCQUF1QixFQUFFLFFBQVEsUUFBUSxDQUFDO0FBQUEsUUFDNUQ7QUFBQSxNQUNGLE9BQU87QUFDTCxhQUFLLGFBQWE7QUFDbEIsYUFBSyxZQUFZLE9BQU87QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLDZCQUE2QixNQUFNO0FBQ2pDLFdBQUssZUFBZSxRQUFRLENBQUMsT0FBTyxHQUFHLFVBQVUsT0FBTyxRQUFRLENBQUM7QUFDakUsV0FBSyxtQkFBbUIsS0FBSyxlQUFlO0FBQUEsUUFDMUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxhQUFhLEtBQUs7QUFBQSxNQUN2QztBQUNBLFdBQUssaUJBQWlCLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDOUM7QUFBQSxJQUNBLDZCQUE2QixNQUFNO0FBQ2pDLFdBQUssZUFBZSxRQUFRLFNBQVUsSUFBSTtBQUN4QyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQzVCLFdBQUcsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLFNBQVUsS0FBSztBQUN0RCxjQUFJLFVBQVUsT0FBTyxRQUFRO0FBQUEsUUFDL0IsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUNELFdBQUssbUJBQW1CLEtBQUssZUFBZTtBQUFBLFFBQzFDLENBQUMsT0FBTyxHQUFHLFFBQVEsYUFBYSxLQUFLO0FBQUEsTUFDdkM7QUFDQSxXQUFLLGlCQUFpQixVQUFVLElBQUksUUFBUTtBQUFBLElBRTlDO0FBQUEsSUFDQSx3QkFBd0IsQ0FBQyxxQkFBcUI7QUFDNUMsV0FBSyxpQkFBaUIsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTztBQUNsRSxZQUFJLEdBQUcsUUFBUSxTQUFTLGtCQUFrQjtBQUN4QyxlQUFLLHFCQUFxQjtBQUMxQixhQUFHLFVBQVUsSUFBSSxRQUFRO0FBQUEsUUFDM0IsT0FBTztBQUNMLGFBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxRQUM5QjtBQUNBLFlBQUksR0FBRyxjQUFjLE1BQU0sRUFBRSxpQkFBaUI7QUFDNUMsZUFBSyxxQkFBcUI7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsaUNBQWlDLE1BQU07QUFDckMsV0FBSyxtQkFBbUIsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFVLE9BQU8sUUFBUSxDQUFDO0FBQ3JFLFdBQUssdUJBQXVCLEtBQUssbUJBQW1CO0FBQUEsUUFDbEQsQ0FBQyxPQUFPLEdBQUcsUUFBUSxhQUFhLEtBQUs7QUFBQSxNQUN2QztBQUNBLFdBQUsscUJBQXFCLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDbEQ7QUFBQSxJQUNBLG1CQUFtQixNQUFNO0FBQ3ZCLFdBQUssWUFBWSxRQUFRLENBQUMsT0FBTztBQUMvQixXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLHdCQUF3QixNQUFNO0FBQzVCLFdBQUssa0JBQWtCLFFBQVEsQ0FBQyxPQUFPO0FBQ3JDLFdBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsaUJBQWlCLENBQUMsbUJBQW1CO0FBQ25DLFdBQUssb0JBQW9CO0FBQ3pCLFdBQUssT0FBTyxhQUFhO0FBQ3pCLFdBQUssT0FBTyxZQUFZO0FBQ3hCLFdBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUMzQyxXQUFLLGlCQUNGLGNBQWMsaUJBQWlCLEVBQy9CLFVBQVUsT0FBTyxRQUFRO0FBQzVCLFdBQUssaUJBQ0YsY0FBYyxpQkFBaUIsRUFDL0IsVUFBVSxJQUFJLFFBQVE7QUFDekIsV0FBSyx5QkFBeUI7QUFDOUIsV0FBSyxzQkFBc0IsZUFBZSxRQUFRLElBQUk7QUFDdEQsV0FBSyxPQUFPO0FBQUEsUUFDVixLQUFLO0FBQUEsUUFDTCxLQUFLLG1CQUFtQixRQUFRO0FBQUEsTUFDbEM7QUFDQSxXQUFLLE9BQU8sYUFBYSxlQUFlLFFBQVEsU0FBUztBQUN6RCxXQUFLLE9BQU8sV0FBVyxlQUFlLFFBQVEsT0FBTztBQUNyRCxXQUFLLE9BQU8sbUJBQW1CLGNBQWM7QUFDN0MsV0FBSyxPQUFPLFNBQVMsVUFBVSxJQUFJLFFBQVE7QUFDM0MsV0FBSyxPQUFPLFVBQVU7QUFBQSxJQUN4QjtBQUFBLElBQ0EsZUFBZSxNQUFNO0FBQ25CLFdBQUssT0FBTyxZQUFZO0FBQ3hCLFdBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzdDO0FBQUEsSUFDQSxTQUFTLE1BQU07QUFDYixVQUFJLEtBQUssMkJBQTJCLE9BQU87QUFDekMsYUFBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQzNDLGFBQUssT0FBTyxhQUFhLEtBQUssWUFBWTtBQUMxQyxZQUFJLGtCQUFrQixDQUFDLEdBQUcsS0FBSyxzQkFBc0IsRUFBRTtBQUFBLFVBQ3JELEtBQUssbUJBQW1CLFFBQVE7QUFBQSxRQUNsQztBQUNBLFlBQUksb0JBQW9CLEtBQUssdUJBQXVCLE9BQU87QUFDekQsNEJBQWtCO0FBQUEsYUFDZjtBQUNILDZCQUFtQjtBQUFBLFFBQ3JCO0FBQ0EsY0FBTSxjQUFjO0FBQUEsVUFDbEIsR0FBRyxLQUFLLHFCQUFxQixpQkFBaUIsV0FBVztBQUFBLFFBQzNELEVBQUU7QUFBQSxVQUNBLENBQUMsT0FDQyxHQUFHLFFBQVEsU0FBUyxDQUFDLEdBQUcsS0FBSyxzQkFBc0IsRUFBRSxlQUFlO0FBQUEsUUFDeEU7QUFDQSxhQUFLLGVBQWUsV0FBVztBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLElBQ0Esc0JBQXNCLE1BQU07QUFDMUIsV0FBSyx5QkFBeUI7QUFDOUIsbUJBQWEsS0FBSyxhQUFhO0FBQy9CLFdBQUssZ0JBQWdCO0FBQUEsSUFDdkI7QUFBQSxFQUNGO0FBQ0EsTUFBTyxtQkFBUTs7O0FDN0xmLFdBQVMsaUJBQWlCLG9CQUFvQixNQUFNO0FBQ2xELFNBQUs7QUFBQSxFQUNQLENBQUM7QUFHRCxNQUFNLGVBQXNCLE1BQU0sa0JBQWtCLFFBQVE7QUFDNUQsTUFBTSxvQkFBMkIsTUFBTSxxQkFBcUIsUUFBUTtBQUNwRSxNQUFNLGdCQUF1QixNQUFNLGlCQUFpQixRQUFRO0FBQzVELE1BQU0sb0JBQTJCLE1BQU0scUJBQXFCLFFBQVE7QUFDcEUsTUFBTSxTQUFTLElBQUksZUFBWSxnQkFBUSxZQUFZO0FBQ25ELE1BQU0sV0FBVyxJQUFJLGlCQUFjLGdCQUFRLGlCQUFpQjtBQUM1RCxNQUFNLE9BQU8sSUFBSSxhQUFVLGdCQUFRLGFBQWE7QUFDaEQsTUFBTSxXQUFXLElBQUksaUJBQWMsZ0JBQVEsaUJBQWlCO0FBQzVELE1BQU0sV0FBVztBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBR0EsZUFBYSxpQkFBaUIsU0FBUyxTQUFVLEdBQUc7QUFDbEQsVUFBTSxVQUFVLEVBQUUsT0FBTyxRQUFRLHFCQUFxQjtBQUN0RCxRQUFJLENBQUMsUUFBUztBQUNkLFVBQU0sZ0JBQWdCLFFBQVEsUUFBUTtBQUN0QyxVQUFNLGVBQWUsU0FBUyxhQUFhO0FBQzNDLFVBQU0sU0FBUyxRQUFRLFFBQVE7QUFFL0IsUUFBSSxvQkFBb0IsUUFBUSxTQUFTO0FBRXZDLG1CQUFhLFlBQVksU0FBUyxNQUFNO0FBQ3hDO0FBQUEsSUFDRjtBQUVBLElBQU8sU0FBUyxVQUFVLElBQUksUUFBUTtBQUV0QyxJQUFPLGlCQUFpQixhQUFhO0FBRXJDLGlCQUFhLFlBQVksU0FBUyxNQUFNO0FBQUEsRUFDMUMsQ0FBQztBQUNELGVBQWEsaUJBQWlCLGFBQWEsU0FBVSxHQUFHO0FBQ3RELFVBQU0sVUFBVSxFQUFFLE9BQU8sUUFBUSx5QkFBeUI7QUFDMUQsUUFBSSxDQUFDLFFBQVM7QUFDZCxRQUFJLEtBQUssaUJBQWlCLFFBQVM7QUFDbkMsU0FBSyxlQUFlO0FBQ3BCLFVBQU0sU0FBUyxRQUFRLFFBQVE7QUFDL0IsV0FBTyxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQ3BDLENBQUM7QUFDRCxlQUFhLGlCQUFpQixZQUFZLFNBQVUsR0FBRztBQUNyRCxVQUFNLFVBQVUsRUFBRSxPQUFPLFFBQVEsd0JBQXdCO0FBQ3pELFFBQUksQ0FBQyxRQUFTO0FBRWQsUUFBSSxRQUFRLFNBQVMsRUFBRSxhQUFhLEVBQUc7QUFDdkMsU0FBSyxlQUFlO0FBQ3BCLFVBQU0sU0FBUyxRQUFRLFFBQVE7QUFDL0IsV0FBTyxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQ3BDLENBQUM7QUFFRCxTQUFPLGlCQUFpQix1QkFBdUIsU0FBVSxHQUFHO0FBQzFELFVBQU0sVUFBVSxFQUFFO0FBQ2xCLFFBQUksQ0FBQyxRQUFTO0FBQ2QsV0FBTyxrQkFBa0IsT0FBTztBQUFBLEVBQ2xDLENBQUM7QUFFRCxTQUFPLGlCQUFpQixzQkFBc0IsU0FBVSxHQUFHO0FBQ3pELFVBQU0sVUFBVSxFQUFFO0FBQ2xCLFFBQUksQ0FBQyxRQUFTO0FBQ2QsV0FBTyxpQkFBaUIsT0FBTztBQUMvQixXQUFPLG1CQUFtQjtBQUFBLEVBQzVCLENBQUM7QUFHRCxFQUFPLFlBQVksaUJBQWlCLFNBQVMsU0FBVSxHQUFHO0FBQ3hELFVBQU0sVUFBVSxFQUFFLE9BQU8sUUFBUSxxQkFBcUI7QUFDdEQsUUFBSSxDQUFDLFFBQVM7QUFDZCxVQUFNLGdCQUFnQixRQUFRLFFBQVEsVUFBVSxFQUFFLFFBQVE7QUFDMUQsVUFBTSxlQUFlLFNBQVMsYUFBYTtBQUMzQyxVQUFNLFNBQVMsUUFBUSxRQUFRO0FBQy9CLGlCQUFhLFlBQVksU0FBUyxNQUFNO0FBQUEsRUFDMUMsQ0FBQztBQUNELEVBQU8sWUFBWSxpQkFBaUIsYUFBYSxTQUFVLEdBQUc7QUFDNUQsVUFBTSxVQUFVLEVBQUUsT0FBTyxRQUFRLHlCQUF5QjtBQUMxRCxRQUFJLENBQUMsUUFBUztBQUNkLFFBQUksS0FBSyxpQkFBaUIsUUFBUztBQUNuQyxTQUFLLGVBQWU7QUFDcEIsVUFBTSxnQkFBZ0IsUUFBUSxRQUFRLFVBQVUsRUFBRSxRQUFRO0FBQzFELFVBQU0sZUFBZSxTQUFTLGFBQWE7QUFDM0MsVUFBTSxTQUFTLFFBQVEsUUFBUTtBQUMvQixpQkFBYSxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQzFDLENBQUM7QUFDRCxFQUFPLFlBQVksaUJBQWlCLFlBQVksU0FBVSxHQUFHO0FBQzNELFVBQU0sVUFBVSxFQUFFLE9BQU8sUUFBUSx3QkFBd0I7QUFDekQsUUFBSSxDQUFDLFFBQVM7QUFFZCxRQUFJLFFBQVEsU0FBUyxFQUFFLGFBQWEsRUFBRztBQUN2QyxTQUFLLGVBQWU7QUFDcEIsVUFBTSxnQkFBZ0IsUUFBUSxRQUFRLFVBQVUsRUFBRSxRQUFRO0FBQzFELFVBQU0sZUFBZSxTQUFTLGFBQWE7QUFDM0MsVUFBTSxTQUFTLFFBQVEsUUFBUTtBQUMvQixpQkFBYSxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQzFDLENBQUM7QUFJRCxFQUFPLFFBQVEsUUFBUSxTQUFVLElBQUk7QUFDbkMsT0FBRyxpQkFBaUIsU0FBUyxTQUFVLEdBQUc7QUFDeEMsWUFBTSxXQUFXLEVBQUUsT0FBTyxRQUFRLE1BQU07QUFDeEMsVUFBSSxDQUFDLFNBQVU7QUFDZixZQUFNLGFBQWEsU0FBUyxRQUFRLFVBQVUsRUFBRSxRQUFRO0FBQ3hELFlBQU0sZUFBZSxTQUFTLFVBQVU7QUFDeEMsbUJBQWEsT0FBTztBQUFBLElBQ3RCLENBQUM7QUFBQSxFQUNILENBQUM7QUFJRCxNQUFNLE9BQU8sV0FBWTtBQUN2QixxQkFBaUI7QUFDakIsSUFBTyxxQkFBcUI7QUFDNUIsSUFBTyxTQUFTLFVBQVUsSUFBSSxRQUFRO0FBQ3RDLGlCQUFhLFVBQVUsT0FBTyxRQUFRO0FBQ3RDLFdBQU8sZ0JBQWdCLFFBQVEsU0FBVSxJQUFJO0FBQzNDLFNBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QixDQUFDO0FBQ0QsSUFBTyxpQkFBaUIsVUFBVTtBQUNsQyxJQUFPLGFBQWE7QUFDcEIsSUFBTyxTQUFTLFVBQVUsT0FBTyxRQUFRO0FBQ3pDLGFBQVMsa0JBQWtCO0FBRzNCLGVBQVcsTUFBTTtBQUNmLG1CQUFhLFVBQVUsSUFBSSxRQUFRO0FBQ25DLGVBQVMsWUFBWSxNQUFPLFVBQVUsSUFBSztBQUFBLElBQzdDLEdBQUcsT0FBTyxHQUFHLGVBQWU7QUFBQSxFQUc5QjtBQUNBLE1BQU0sbUJBQW1CLFdBQVk7QUFDbkMsVUFBTSxjQUFjLFNBQVMsaUJBQWlCLE1BQU07QUFDcEQsVUFBTSxrQkFBa0I7QUFBQSxNQUN0QixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsSUFDYjtBQUNBLFVBQU0sZ0JBQWdCLElBQUkscUJBQXFCLENBQUMsWUFBWTtBQUMxRCxjQUFRLFFBQVEsQ0FBQyxVQUFVO0FBQ3pCLGNBQU0sUUFBUSxNQUFNO0FBQ3BCLGNBQU0sVUFBVSxNQUFNLGlCQUFpQixRQUFRO0FBQy9DLFlBQUksTUFBTSxnQkFBZ0I7QUFFeEIsa0JBQVEsUUFBUSxDQUFDLFdBQVc7QUFFMUIsa0JBQU0sVUFBVSxPQUFPLGFBQWEsVUFBVSxLQUFLLE9BQU87QUFDMUQsZ0JBQUksU0FBUztBQUNYLHFCQUFPLE1BQU07QUFFYixxQkFBTyxhQUFhLFlBQVksT0FBTztBQUFBLFlBQ3pDO0FBQUEsVUFDRixDQUFDO0FBQ0QsZ0JBQU0sS0FBSztBQUFBLFFBQ2IsT0FBTztBQUdMLHNCQUFZLGNBQWM7QUFDMUIsc0JBQVkscUJBQXFCO0FBQ2pDLHNCQUFZLFdBQVc7QUFDdkIsdUJBQWEsTUFBTSxRQUFRLFVBQVUsQ0FBQztBQUN0QyxnQkFBTSxNQUFNO0FBQ1osa0JBQVEsUUFBUSxDQUFDLFdBQVc7QUFFMUIsa0JBQU0sYUFBYSxPQUFPO0FBQzFCLGdCQUFJLFlBQVk7QUFDZCxxQkFBTyxhQUFhLFlBQVksVUFBVTtBQUMxQyxxQkFBTyxNQUFNO0FBQ2IscUJBQU8sZ0JBQWdCLEtBQUs7QUFBQSxZQUM5QjtBQUFBLFVBQ0YsQ0FBQztBQUVELGdCQUFNLEtBQUs7QUFBQSxRQUNiO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxHQUFHLGVBQWU7QUFDbEIsZ0JBQVksUUFBUSxDQUFDLFFBQVEsY0FBYyxRQUFRLEdBQUcsQ0FBQztBQUd2RCxVQUFNLGVBQWUsU0FBVSxTQUFTO0FBQ3RDLFVBQUksQ0FBQyxRQUFTO0FBQ2QsY0FBUSxpQkFBaUIsTUFBTSxFQUFFLFFBQVEsU0FBVSxJQUFJO0FBQ3JELFdBQUcsY0FBYztBQUNqQixXQUFHLE1BQU07QUFBQSxNQUNYLENBQUM7QUFDRCxNQUFPLHNCQUFzQixPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGOyIsCiAgIm5hbWVzIjogWyJpc0ludHJvIl0KfQo=
