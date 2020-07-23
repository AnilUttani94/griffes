$(document).ready(function() {
  $(".slideBtn").click(function() {
    if ($("#sidenav").width() === 0) {
      document.getElementById("sidenav").style.width = "900px";
      document.getElementById("main").style.paddingRight = "900px";
      document.getElementById("slidebtn").style.paddingRight = "900px";
      document.getElementById("left-panel").style.display = "none";
    } else {
      document.getElementById("sidenav").style.width = "0";
      document.getElementById("main").style.paddingRight = "0";
      document.getElementById("slidebtn").style.paddingRight = "0";
      document.getElementById("left-panel").style.display = "block";
    }
  });
});

$(document).ready(function() {
  // Variables
  var clickedTab = $(".tabs > .active");
  var tabWrapper = $(".tab__content");
  var activeTab = tabWrapper.find(".active");
  var activeTabHeight = activeTab.outerHeight();

  // Show tab on page load
  activeTab.show();

  // Set height of wrapper on page load
  tabWrapper.height(activeTabHeight);

  $(".tabs > li").on("click", function() {
    // Remove class from active tab
    $(".tabs > li").removeClass("active");

    // Add class active to clicked tab
    $(this).addClass("active");

    // Update clickedTab variable
    clickedTab = $(".tabs .active");

    // fade out active tab
    activeTab.fadeOut(250, function() {
      // Remove active class all tabs
      $(".tab__content > li").removeClass("active");

      // Get index of clicked tab
      var clickedTabIndex = clickedTab.index();

      // Add class active to corresponding tab
      $(".tab__content > li")
        .eq(clickedTabIndex)
        .addClass("active");

      // update new active tab
      activeTab = $(".tab__content > .active");

      // Update variable
      activeTabHeight = activeTab.outerHeight();

      // Animate height of wrapper to new tab height
      tabWrapper
        .stop()
        .delay(50)
        .animate(
          {
            height: activeTabHeight
          },
          500,
          function() {
            // Fade in active tab
            activeTab.delay(50).fadeIn(250);
          }
        );
    });
  });

  // Variables
  var colorButton = $(".colors li");

  colorButton.on("click", function() {
    // Remove class from currently active button
    $(".colors > li").removeClass("active-color");

    // Add class active to clicked button
    $(this).addClass("active-color");

    // Get background color of clicked
    var newColor = $(this).attr("data-color");

    // Change background of everything with class .bg-color
    $(".bg-color").css("background-color", newColor);

    // Change color of everything with class .text-color
    $(".text-color").css("color", newColor);
  });
});

/* Grid images*/
$(function() {
  var selectedClass = "";
  $(".filter").click(function() {
    selectedClass = $(this).attr("data-rel");
    $("#gallery").fadeTo(100, 0.1);
    $("#gallery div")
      .not("." + selectedClass)
      .fadeOut()
      .removeClass("animation");
    setTimeout(function() {
      $("." + selectedClass)
        .fadeIn()
        .addClass("animation");
      $("#gallery").fadeTo(300, 1);
    }, 300);
  });
});
$(function() {
  $(document).on("change", ".uploadFile", function() {
    console.log("on change funcatino ");
    var uploadFile = $(this);
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

    console.log("her change funcatino ");

    if (/^image/.test(files[0].type)) {
      // only image file
      var reader = new FileReader(); // instance of the FileReader
      reader.readAsDataURL(files[0]); // read the local file

      console.log("in change funcatino ");

      // load local file picture
      reader.addEventListener(
        "load",
        function() {
          //   preview.src = reader.result;
          var localBase64 = reader.result.split("base64,")[1];
          var queries = [
            {
              input: {
                id: null,
                base64: localBase64
              }
            }
          ];
          var options = {
            page: 1,
            perPage: 20
          };

          // var inputs2 ={ base64: localBase64,metadata:{"name": "google image","size":"10 kb", "description":" google is seach engine", "company":"brams"}};

          // app.inputs.create(inputs2).then(
          //    function(response) {
          //      alert("image  save successfully");

          //      response2=response;
          //      console.logo(response);
          //    },
          //    function(err) {
          //      alert("image not save"+err);
          //    });

          var async_function = async function() {
            var response3 = await app.inputs.search(queries, options);
            console.log(response3);

            var jsonObject = JSON.parse(JSON.stringify(response3));

            // hitTemplate(jsonObject.hits);
            console.log("console log done");
            var hits = document.getElementById("hits");

            hits.innerHtml = "";
            hits.textContent = "";
            var previousURL = "";

            var ais_hits = document.createElement("div");
            ais_hits.setAttribute("class", "ais-hits");
            hits.appendChild(ais_hits);
            document.getElementsByTagName("strong")[0].innerHTML =
              jsonObject.hits.length;
            for (var i = 0; i < jsonObject.hits.length; i++) {
              // if (i % 5 == 0) {

              // }

              var ais_hits__item = document.createElement("div");
              ais_hits__item.setAttribute("class", "ais-hits--item");
              var hit = document.createElement("div");
              hit.setAttribute("class", "hit");
              var hit_image = document.createElement("div");
              hit_image.setAttribute("class", "hit-image item-2");
              var hit_content = document.createElement("div");

              hit_content.setAttribute("class", "hit-content");
              var img = document.createElement("img");
              var hit_name = document.createElement("div");
              hit_name.setAttribute("class", "hit-name");
              var hit_description = document.createElement("div");
              hit_description.setAttribute("class", "hit-description");
              var hit_price = document.createElement("div");
              hit_price.setAttribute("class", "hit-price");
              var hit_Inventors = document.createElement("div");
              var hit_IPC = document.createElement("div");
              var hit_CPC = document.createElement("div");

              var sub_div = document.createElement("div");

              var anchor = document.createElement("a");
              anchor.setAttribute("href", "#");
              anchor.setAttribute("data-toggle", "modal");
              anchor.setAttribute("data-target", "#myModal");
              // divCol.setAttribute('class', 'column');

              var metaField,
                Title,
                Representative,
                Publications,
                Inventors,
                IPC,
                CPC;
              if (jsonObject.hits[i].input.data.metadata) {
                Title = jsonObject.hits[i].input.data.metadata.Title;
                Publications =
                  jsonObject.hits[i].input.data.metadata.Publications;
                Representative =
                  jsonObject.hits[i].input.data.metadata.Representative;
                Inventors = jsonObject.hits[i].input.data.metadata.Inventors;
                IPC = jsonObject.hits[i].input.data.metadata.IPC;
                CPC = jsonObject.hits[i].input.data.metadata.CPC;
              } else {
                metaField = "";
              }

              if (previousURL == "") {
                previousURL = jsonObject.hits[i].input.data.image.url;
              } else if (
                previousURL == jsonObject.hits[i].input.data.image.url
              ) {
                console.log("duplicate url");
                continue;
              }

              previousURL = jsonObject.hits[i].input.data.image.url;
              img.setAttribute("src", jsonObject.hits[i].input.data.image.url);
              //     img.setAttribute('style', 'width:100%');
              img.setAttribute("title", Title);

              // var p = document.createElement('div');

              anchor.innerHTML = Title;
              hit_description.innerHTML = Publications;
              hit_price.innerHTML = Representative;
              hit_Inventors.innerHTML = Inventors;
              hit_IPC.innerHTML = IPC;
              hit_CPC.innerHTML = CPC;

              console.log(Title);
              console.log(Publications);
              console.log(Representative);
              console.log(IPC);

              hit_name.appendChild(anchor);
              sub_div.appendChild(hit_name);
              sub_div.appendChild(hit_description);
              hit_description.appendChild(hit_Inventors);
              hit_description.appendChild(hit_price);
              hit_description.appendChild(hit_IPC);
              hit_description.appendChild(hit_CPC);
              hit_content.appendChild(sub_div);

              hit_image.appendChild(img);

              hit.appendChild(hit_image);
              hit.appendChild(hit_content);
              ais_hits__item.appendChild(hit);

              ais_hits.appendChild(ais_hits__item);
              // divCol.appendChild(img);
              // divRow.appendChild(divCol);
            }
          };
          async_function();
        },
        false
      );

      reader.onloadend = function() {
        document
          .getElementById("imagePreview2")
          .setAttribute("src", this.result);
        // set image data as background of div
        //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
        //uploadFile.closest(".imgUp").find('.imagePreview').attr("src", "url("+this.result+")");
      };
    }
  });
});
//});
