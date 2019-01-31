import $ from 'jquery';
import dialog from 'jquery-ui/ui/widgets/dialog';
import tabs from 'jquery-ui/ui/widgets/tabs';

import 'jquery-ui/themes/base/all.css';

import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function ($, dialog, tabs) {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$tabsHolder = $('#tabs');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');

    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {
    $(DOM.$tabsHolder).tabs();
  }

  function createDialogs() {
    dialog({ autoOpen: false }, DOM.$listDialog);
  }

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);
    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    console.log("This should create a new list");
    dialog("open", DOM.$listDialog);
  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    $(this).closest('.column').remove();
  }
  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();

    let cardInput = $(this).find('input[name=title]');
    let newCardTitle = cardInput.val();

    if (!newCardTitle) return; // show error eller något

    $(this)
      .closest('.add-new')
      .before('<li class="card">' + newCardTitle + '<button class="button delete">X</button></li>');

    $(this)
      .parent()
      .prev()
      .find('button.delete')
      .click(deleteCard)
    sortCard();

    cardInput.val(""); // töm inmatningsfält efter skapat kort
  };

  function sortCard() {

    $(".card").sortable({
      appendTo: document.body
    });


  };

  function deleteCard() {
    console.log("This should delete the card you clicked on");
    $(this).parent().remove();
  };

  // Metod för att rita ut element i DOM:en
  function render() { }

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    sortCard();
    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})($, dialog, tabs);

//usage
$("document").ready(function () {
  jtrello.init();
});
