$(document).ready(function() {

  $("#scrape-btn").on("click", function(e) {
    e.preventDefault();

    $("div.articles").empty();

    $.ajax({
      method: "GET",
      url: "/scrape"
    }).done(function(articles) {

      for (var i = 0; i < 20; i ++) {

        var newPanel = $("<div>").addClass("panel panel-default");
        var panelHeading = $("<div>").addClass("panel-heading");
        var panelBody = $("<div>").addClass("panel-body").text("Link: " + articles[i].link);
        var panelTitle = $("<h3>").addClass("panel-title").text(articles[i].title);

        panelHeading.append(panelTitle);
        newPanel.append(panelHeading).append(panelBody);

        $("div.articles").append(newPanel);
      }

    });

  });


});