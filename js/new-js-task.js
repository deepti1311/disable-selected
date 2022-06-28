var counter = 1;

$("#add").click(function () {
  let row = $(this).siblings("#product").children().children("#row1").html();
  let rowCount = $("#product tr").length;
  if (rowCount < 4) {
    counter++;
    $("#product").append(`<tr id="row${counter}">` + row + `</tr>`);
    $(`#row${counter}`).children().children("button").attr("class", `rem new`);

    selected_vals = [];
  }
  $(".rem").click(function () {
    if ($(this).attr("class") === "rem new") {
      $(this).parent().parent().remove();
    }
  });
  $(".selector").change(function () {});
});

$(document).ready(function () {
  var selectedList = [];

  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return

    if (!array) return false;

    // compare lengths - can save a lot of time

    if (this.length != array.length) return false;

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays

      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays

        if (!this[i].equals(array[i])) return false;
      } else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}

        return false;
      }
    }

    return true;
  };

  //used to check if all dropdown values have been selected

  function updateSelectedList() {
    selectedList = [];

    var selectedValue;

    $(".s").each(function () {
      selectedValue = $(this).find("option:selected").text();

      if (selectedValue != "" && $.inArray(selectedValue, selectedList) == "-1") {
        selectedList.push(selectedValue);
      }
    });
  }

  //disable the dropdown items that have already been selected

  function disableAlreadySelected() {
    $("option").each(function () {
      if ($.inArray(this.value, selectedList) != "-1") {
        $(this).attr("disabled", true);
      } else {
        $(this).attr("disabled", false);
      }
    });
  }

  //If all values have been selected, don't let the user add more rows

  function hideAddButtonIfDone() {
    masterList.sort();

    selectedList.sort();

    if (masterList.equals(selectedList)) {
      console.log("lists equal, hiding add button");

      $("#product #add").hide();
    } else {
      console.log("lists not equal, showing add button");

      $("#product #add").show();
    }
  }

  $("#product").on("click", ".s", function () {
    setTimeout(function () {
      updateSelectedList();

      disableAlreadySelected();

      hideAddButtonIfDone();
    }, 0);
  });

  //when a new table row is added, disable the dropdown options that have already been selected

  $("#product #add").on("click", disableAlreadySelected);

  //when a table row is removed, update all dropdowns (the removed row's dropdown option will be re-enabled

  //in remaining dropdowns

  $("#product").on("DOMNodeRemoved", ".rem > tr", function () {
    updateSelectedList();

    disableAlreadySelected();

    hideAddButtonIfDone();
  });
});
