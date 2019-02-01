import $ from 'jquery';
import dialog from 'jquery-ui/ui/widgets/dialog';
import tabs from 'jquery-ui/ui/widgets/tabs';
import sortable from 'jquery-ui/ui/widgets/sortable';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import slideToggle from 'jquery-ui/ui/widgets/slider';

import 'jquery-ui/themes/base/all.css';

import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function ($, dialog, tabs, sortable, datepicker, slideToggle) {
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
    DOM.$board.on('click', '.list-header > button.delete', deleteList);
    DOM.$board.on('submit', 'form.new-card', createCard);
    DOM.$board.on('click', '.card > button.delete', deleteCard);


  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    // let createList = $('.column-1').clone(true, true);
    // $(createList).prependTo('.board');


    $(this)
      .parent()
      .before(`<div class="column ui-sortable">
        <div class="list ui-sortable-handle">
            <div class="list-header">
            <p>Date: <input type="text" class="datepicker"></p>
                Done
                <button class="button delete">X</button>
            </div>
            <ul class="list-cards ui-sortable">
                <li class="card">
                    Card #3
                    <button class="button delete">X</button>
                </li>
                <li class="add-new">
                    <form class="new-card" action="index.html">
                        <input type="text" name="title" placeholder="Please name the card">
                        <button class="button add">Add new card</button>
                    </form>
                </li>
            </ul>
        </div>
    </div>`)
    createSortable();
    createCard();
    datepicker();

  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    $(this).closest('.column').remove()



  };
  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard() {
    event.preventDefault();

    let cardInput = $(this).find('input');
    let newCardTitle = cardInput.val();

    // if (!newCardTitle) return; // show error eller något

    $(this)
      .parent()
      .before('<li class="card">' + newCardTitle + '<button class="button delete">X</button></li>');
    $(this)
      .parent()
      .prev()
      .find('button.delete')
      .click(deleteCard).slideToggle();

    cardInput.val(""); // töm inmatningsfält efter skapat kort
  };
  function createSortable() {

    $('.list-cards').sortable({ connectWith: '.list-cards' });
    // $('.list-cards').disableSelection({ connectWith: '.list-cards' });

    $('.board').sortable({ connectWith: '.board', axis: 'x' });
    // $('.column').disableSelection({ connectWith: '.column' });

  };

  function deleteCard() {
    console.log("This should delete the card you clicked on");
    $(this).parent().remove().slideToggle();
  };


  // $( function() {
  //   // run the currently selected effect
  //   function runEffect() {
  //     // get effect type from
  //     var selectedEffect = $( "#effectTypes" ).val();

  //     // Most effect types need no options passed by default
  //     var options = {};
  //     // some effects have required parameters
  //     if ( selectedEffect === "scale" ) {
  //       options = { percent: 50 };
  //     } else if ( selectedEffect === "transfer" ) {
  //       options = { to: "#button", className: "ui-effects-transfer" };
  //     } else if ( selectedEffect === "size" ) {
  //       options = { to: { width: 200, height: 60 } };
  //     }

  //     // Run the effect
  //     $( ".card" ).effect( selectedEffect, options, 500, callback );
  //   };
  // 
  // function datepicker() {
  //   $(".datepicker").datepicker('option', 'all')
  // };

  function datepicker() {
    $(".datepicker").datepicker();
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
    datepicker();
  }

  // All kod här
  return {
    init: init
  };
})($, dialog, tabs, sortable, datepicker, slideToggle);

//usage
$("document").ready(function () {
  jtrello.init();
});
