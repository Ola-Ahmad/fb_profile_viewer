/**
 * Created by Hp on 29/12/2016.
 */
$(document).ready(function () {
    $("#contacts-grid").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: "https://api.mlab.com/api/1/databases/fb_profile_viewer_db/collections/contacts?f={%22_id%22:1,%22fullName%22:1,%22facebookID%22:1,%22facebookURL%22:1}&apiKey=hoKcMVDx6ezkYACMw2sveutGpmVadzdF",
                    dataType: "json"
                },
                create: {
                    // url:"" ,
//                        dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            // batch: true,
            pageSize: 5,
            // serverPaging: true,
            // serverSorting: true,
            // serverFiltering: true,
            schema: {
                model: {
                    id: "_id.$oid",
                    fields: {
                        "_id.$oid": { editable: false, nullable: true },
                        fullName: { type: "string",defaultValue: 'Name',validation: { required: true } },
                        facebookURL: {type: "string", defaultValue:'facebook.com', validation: { required: true} },
                        facebookID: {  type: "number", defaultValue:0,validation: { min: 0, required: true }
                        }
                    }
                }
            }
        },
        scrollable: false,
        sortable: true,
        // groupable: true,
        pageable: {
            pageSizes: true,
            buttonCount: 3
        },
        filterable: {
            mode: "row",

        },
        toolbar: ["create"],
        columns: [
//                    {
//                        field: ["_id.$oid"],
//                        title: "ID",
//                        width: 240
//
//                    },
            {
                template:"<a href='index.html\\#!/login'>#: fullName #</a>",
                field: "fullName",
                title: "Contact Name",
                width: "15%",
                filterable: {
                    cell: {
                        showOperators: false
                    }
                }

                }, {
                template:"<a href='#: facebookURL #'  target='_blank'> #: facebookURL # </a>",
                field: "facebookURL",
                title: "Facebook profile URL",
                width: "30%",
                filterable: {
                    cell: {
                        showOperators: false
                    }
                }

            }, {
                field: "facebookID",
                title: "Facebook ID",
                width: "20%",

                // width: 150,
                filterable: {
                    cell: {
                        showOperators: false
                    }
                }

            } ,
            {
                command: ["edit","destroy"], title: "&nbsp;",
                width: "20%"

            }
            // ,
            // { command: [
            //     { name: "edit",
            //     title: "&nbsp;",
            //     width: "20%" },
            // { name: "destroy",
            //     title: "&nbsp;",
            //     width: "20%"
            // }]}
            ],
        editable: "inline"
    });






});