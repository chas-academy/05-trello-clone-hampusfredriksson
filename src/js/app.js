import $ from 'jquery';
import dialog from 'jquery-ui/ui/widgets/dialog';
import tabs from 'jquery-ui/ui/widgets/tabs';
import sortable from 'jquery-ui/ui/widgets/sortable';

import 'jquery-ui/themes/base/all.css';

import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function ($, dialog, tabs, sortable) {
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
    //dialog("open", DOM.$listDialog);

    $(this)
      .parent()
      .prev()
      .before('<div class="column"><div class="list"><div class="list-header">Check<button class="button delete">X</button></div><ul class="list-cards"><li class="card">#Card<button class="button delete">X</button></li><li class="add-new"><form class="new-card" action="index.html"><input type="text" name="title" placeholder="Please name the card"/><button class="button add">Add new card</button>');
    //  parent before div class column div class list div class list header
    // Lägg till column före knappen (parent) för att skapa en ny lista efter där add ligger

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

    cardInput.val(""); // töm inmatningsfält efter skapat kort
  };
  function createSortable() {

    $('.list-cards').sortable({ connectWith: '.list-cards' });
    $('.list-cards').disableSelection({ connectWith: '.list-cards' });

    $('.column').sortable({ connectWith: '.column' });
    $('.column').disableSelection({ connectWith: '.column' });

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
    bindEvents();
    createSortable();
  }

  // All kod här
  return {
    init: init
  };
})($, dialog, tabs, sortable);

//usage
$("document").ready(function () {
  jtrello.init();
});
