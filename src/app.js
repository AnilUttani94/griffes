/* global instantsearch */

import { hitTemplate } from "./helpers";

const search = instantsearch({
  appId: "4XPF979Z1J",
  apiKey: "bd17982fc03932f6e82a87a3242ed8d9",
  indexName: "griffes",
  searchParameters: {
    hitsPerPage: 15,
    // filters: "Reg_date_timestamp:1401148800 TO 1401148800",
    attributesToSnippet: ["Publications:24"],
    snippetEllipsisText: " [...]"
  }
});
const autocomplete = instantsearch.connectors.connectAutocomplete(
  ({ indices, refine, widgetParams }, isFirstRendering) => {
    const { container, onSelectChange } = widgetParams;

    if (isFirstRendering) {
      console.log(container);
      // debugger;

      container.html('<select id="ais-autocomplete"></select>');

      container.find("select").selectize({
        options: [],
        valueField: "query",
        labelField: "query",
        render: {
          option(item) {
            try {
              var [name] = item.griffes.facets.exact_matches.name;
              var [category] = item.griffes.facets.exact_matches.BijouxType;
              if (category.value == undefined) category.value = " ";
            } catch (e) {
              return `
              <div class="option">
                ${item.query} <img
                src="https://www.powerplanetonline.com/cdnassets/reloj_mecanico_xiaomi_mi_ciga_design_my_series_02_plata_ad_l.jpg"
                style="height: 50px;float:right"
              />
              </div>
            `;
            }
            //${category.value}

            console.log(item);

            return `
              <div class="option">
                ${item.query} in <i> ${category.value}</i><img
                src="https://storage.cloud.google.com/deeplinq-cloud/${
                  name.value
                }"
                style="height: 50px;float:right"
              />
              </div>
            `;
          }
        },
        highlight: false,
        onType: refine,
        onBlur() {
          refine(this.getValue());
        },
        score() {
          return function() {
            return 1;
          };
        },
        onChange(value) {
          onSelectChange(value);
          refine(value);
        }
      });

      return;
    }

    const [select] = container.find("select");

    indices.forEach(index => {
      select.selectize.clearOptions();
      index.results.hits.forEach(h => select.selectize.addOption(h));
      select.selectize.refreshOptions(select.selectize.isOpen);
      //debugger;
    });
  }
);

//appId: "4XPF979Z1J",
// apiKey: "bd17982fc03932f6e82a87a3242ed8d9",
//indexName: "griffes",

const suggestions = instantsearch({
  appId: "4XPF979Z1J",
  apiKey: "bd17982fc03932f6e82a87a3242ed8d9",
  indexName: "griffes_query_suggestions"
});
suggestions.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 5
  })
);
suggestions.addWidget(
  autocomplete({
    container: $("#autocomplete"),
    onSelectChange(value) {
      search.helper.setQuery(value).search();
    },
    cssClasses: {
      root: "root",
      form: "form",
      input: "input form-control",
      submit: "btn btn-default",
      reset: "btn btn-default"
    }
  })
);
const datePicker = instantsearch.connectors.connectRange(
  (options, isFirstRendering) => {
    if (!isFirstRendering) return;

    const { refine } = options;

    new Calendar({
      element: $("#calendar"),
      callback: function() {
        const start = new Date(this.start_date).getTime();
        const end = new Date(this.end_date).getTime();

        //refine([start, end]);
        refine(["1401148800", "1401148800"]);
      },
      // Some good parameters based on our dataset:
      start_date: new Date(),
      end_date: new Date(),
      earliest_date: new Date("01/01/2008"),
      latest_date: new Date("01/10/2020")
    });
  }
);

const datePicker_appDate = instantsearch.connectors.connectRange(
  (options, isFirstRendering) => {
    if (!isFirstRendering) return;
    console.log(options.instantSearchInstance);
    const { refine } = options;

    new Calendar({
      element: $("#app_date"),
      callback: function() {
        const start = new Date(this.start_date).getTime();
        const end = new Date(this.end_date).getTime();

        //refine([start, end]);
        console.log(start + " - " + end);
        refine(["1572393599", "1572393599"]);
      },
      // Some good parameters based on our dataset:
      start_date: new Date(),
      end_date: new Date(),
      earliest_date: new Date("01/01/2008"),
      latest_date: new Date("01/10/2020")
    });
  }
);

const datePicker_earliest_publications = instantsearch.connectors.connectRange(
  (options, isFirstRendering) => {
    if (!isFirstRendering) return;
    console.log(options.instantSearchInstance);
    const { refine } = options;

    new Calendar({
      element: $("#earliest_publications"),
      callback: function() {
        const start = new Date(this.start_date).getTime();
        const end = new Date(this.end_date).getTime();

        //refine([start, end]);
        console.log(start + " - " + end);
        refine(["1339027199", "1339027199"]);
      },
      // Some good parameters based on our dataset:
      start_date: new Date(),
      end_date: new Date(),
      earliest_date: new Date("01/01/2008"),
      latest_date: new Date("01/10/2020")
    });
  }
);

const advSearch = search.addWidget({
  init: function(opts) {
    console.log(opts.instantSearchInstance);

    const helper = opts.helper;
    const input = document.querySelector("#btn-get");
    input.addEventListener("click", function(e) {
      console.log("event intercepted");
      console.log(helper);
      helper.toggleFacetRefinement("Reg_date_timestamp", 1401148800).search();

      /* helper
        .setQuery("dummy") // update the parameters
        .search(); // launch the query */
    });
  }
});

search.addWidget(
  datePicker({
    attributeName: "Reg_date_timestamp"
  })
);

search.addWidget(
  datePicker_appDate({
    attributeName: "App_date"
  })
);

search.addWidget(
  datePicker_earliest_publications({
    attributeName: "Earliest_publication_timestamp"
  })
);

// Uncomment the following widget to add hits list.

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results.",
      item: function(hit) {
        return hitTemplate(hit);
      }
    }
  })
);

// Uncomment the following widget to add a search bar.

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search",
    showReset: false,
    cssClasses: {
      root: "root",
      form: "form",
      input: "input form-control",
      submit: "btn btn-default",
      reset: "btn btn-default"
    }
  })
);

// Uncomment the following widget to add search stats.

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats",
    templates: {
      body(hit) {
        return `<span role="img" aria-label="emoji">⚡️</span> <strong>${
          hit.nbHits
        }</strong> results found ${
          hit.query !== "" ? `for <strong>"${hit.query}"</strong>` : ``
        } in <strong>${hit.processingTimeMS}ms</strong>`;
      }
    }
  })
);

// Uncomment the following widget to add categories list.

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#categories",
    attributeName: "tt",
    autoHideContainer: false,
    templates: {
      header: "Categories"
    }
  })
);

//inventors
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#inventors",
    attributeName: "Inventors",
    autoHideContainer: false,
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: false,
    searchForFacetValues: true,
    searchableEscapeFacetValues: false,
    autoHideContainer: false,
    limit: 5
  })
);

//Design number
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#design_number",
    attributeName: "Design number",
    autoHideContainer: false,
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: false,
    searchForFacetValues: true,
    searchableEscapeFacetValues: false,
    autoHideContainer: false,
    limit: 5
  })
);

//Family number
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#family_number",
    attributeName: "Family number",
    autoHideContainer: false,
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: false,
    searchForFacetValues: true,
    searchableEscapeFacetValues: false,
    autoHideContainer: false,
    limit: 5
  })
);

//CPC
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#cpc",
    attributeName: "CPC",
    autoHideContainer: false,
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: false,
    searchForFacetValues: true,
    searchableEscapeFacetValues: false,
    autoHideContainer: false,
    limit: 5
  })
);

//CPC
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#ipc",
    attributeName: "IPC",
    autoHideContainer: false,
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: false,
    searchForFacetValues: true,
    searchableEscapeFacetValues: false,
    autoHideContainer: false,
    limit: 5
  })
);

//Owner
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#Owner",
    attributeName: "Owner",
    autoHideContainer: false,
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: false,
    searchForFacetValues: true,
    searchableEscapeFacetValues: false,
    autoHideContainer: false,
    limit: 5
  })
);
// Reg Date

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#date",
    attributeName: "Reg_date",
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: true,
    searchForFacetValues: true,
    autoHideContainer: false
  })
);

// Applicants

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#applicants",
    attributeName: "Applicants",
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: false,
    searchForFacetValues: true,
    searchableEscapeFacetValues: false,
    autoHideContainer: false,
    limit: 5
  })
);

// Uncomment the following widget to add brands list.

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#brands",
    attributeName: "BijouxType",
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: true,
    searchForFacetValues: true,
    autoHideContainer: false,
    limit: 5
  })
);

// Register
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#register",
    attributeName: "register",
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: true,
    searchForFacetValues: true,
    autoHideContainer: false,
    limit: 5
  })
);

// Que voyez vous
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#que_voyez_vous",
    attributeName: "Que voyez vous",
    searchable: true,
    searchablePlaceholder: "Search",
    searchableIsAlwaysActive: true,
    searchForFacetValues: true,
    autoHideContainer: false,
    limit: 5
  })
);

// Uncomment the following widget to add price range.
/*
search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: "#price",
    autoHideContainer: false,
    attributeName: "Reg_date_timestamp",
    templates: {
      header: "Reg_date_timestamp"
    }
  })
);

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: "#price",
    autoHideContainer: false,
    attributeName: "price",
    templates: {
      header: "Price"
    }
  })
);
*/

// Uncomment the following widget to add pagination.

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

/* Start advanced search */

/* End advanced search */
suggestions.start();
search.start();
