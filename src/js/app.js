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
    DOM.$body = $("body");
    DOM.$cardDialog = $(".card-creation-dialog")
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');
    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
    DOM.$newDialog = $('form.dialog-form');
  }

  function createTabs() {
    $(DOM.$tabsHolder).tabs();
  }

  function createDialogs() {
    DOM.$listDialog.dialog({
      autoOpen: false,
    });
  }

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', toggleDialog);
    DOM.$board.on('click', '.list-header > button.delete', deleteList);
    DOM.$board.on('submit', 'form.new-card', createCard);
    DOM.$board.on('click', '.card > button.delete', deleteCard);
    DOM.$newDialog.on("submit", createList);
    DOM.$listDialog.on("click", "form.new.card", createCard);



  }

  function toggleDialog() {
    $("#list-creation-dialog").dialog("open");
    $('#list-creation-dialog input.datepicker').datepicker()
  };

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    let listTitle = $("input[name='list-title']").val();
    let listDate = $("input[name='date']").val();
    console.log(listTitle, listDate)

    $('#list-creation-dialog').dialog("close");



    let counter = 3
    // $(this).first('.column: last')
    // .before

    DOM.$board.prepend(`<div class="column ui-sortable">
    <div class="list ui-sortable-handle">
    <div class="list-header">
            ${listTitle} | <small>${listDate}</small>
                <button class="button delete">X</button>
                </div>
            <ul class="list-cards ui-sortable">
                <li class="card">
                Card #${counter++}
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
        </div>`);
    createSortable();
    // createCard();

    // $(this).closest('list').slideDown(500, function () {
    // })


  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    $(this).closest('.column').slideUp(500)
  };
  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard() {
    event.preventDefault();

    let cardInput = $(this).find('input');
    let newCardTitle = cardInput.val();


    $(this)
      .parent()
      .before('<li class="card">' + newCardTitle + '<button class="button delete">X</button></li>');
    $(this)
      .parent()
      .prev()
      .find('button.delete')
      .click(deleteCard);

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
    $(this).closest('.card').slideUp(300, function () {

      $(this).closest('.card').remove()

    })

  };

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
    // createList();
    // toggleDialog();
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