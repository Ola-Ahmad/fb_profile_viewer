/**
 * Created by Hp on 29/12/2016.
 */

function createRow() {
    
}

$(document).ready(function() {





    let dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    //get data using Mlan API
                    // url: "https://api.mlab.com/api/1/databases/fb_profile_viewer_db/collections/contacts?f={%22_id%22:1,%22fullName%22:1,%22facebookID%22:1,%22facebookURL%22:1}&apiKey=hoKcMVDx6ezkYACMw2sveutGpmVadzdF",
                    //getting data using my API that usees node.js driver to connect with mlab
                    url:"/contacts",
                    type:"GET"

                },
                    create: {
                    url: "/contacts",
                    //  data:models ,
                    type: "POST",
                       // data: $("#contacts-grid").data("kendoGrid"),

    // data: {
                    //
                    //     fullName: "Ola Ahmad2",
                    //     facebookURL: "https://www.facebook.com/OlaAhmad93",
                    //     facebookID: 1571226526430098
                    //
                    //
                    //     // contentType: "application/json"
                    //     // dataType: "jsonp"
                    //
                    // }
                },
                    update: {
                        url: "/contacts",
                        //  data:models ,
                        type: "POST",
                        // data: {
                        //
                        //     "fullName": "Ola Ahmad2",
                        //     "facebookURL": "https://www.facebook.com/OlaAhmad93",
                        //     "facebookID": 1571226526430098,
                        //
                        //
                        //     // contentType: "application/json"
                        //     // dataType: "jsonp"
                        //
                        // }

                    },
                    destroy: {
                        // url:saveContact(options) ,
                        // dataType: "jsonp"
                    },
                    parameterMap: function(data, operation) {
                        console.log('operation: '+operation);
                        console.log('data.models: '+data.models);
                        // if (operation !== "read" && data.models) {
                        //     return {
                        //         models: kendo.stringify(data.models)
                        //
                        //     };
                        // }
                        if (operation == "create") {
                            // send the created data items as the "models" service parameter encoded in JSON

                            return {models: kendo.stringify(data.models)};
                        }
                    }

            },
            batch: false,
            pageSize: 5,
            // serverPaging: true,
            // serverSorting: true,
            // serverFiltering: true,
            schema: {
               // errors: "Errors",
                model: {
                    // id: ["_id.$oid"],
                    id:"facebookID",
                    fields: {
                        // "_id.$oid": {
                        //     editable: false,
                        //     nullable: true
                        // },
                        fullName: {
                            type: "string",
                            defaultValue: 'Name',
                            validation: {
                                required: true
                            }
                        },
                        facebookURL: {
                            type: "string",
                            defaultValue: 'facebook.com',
                            validation: {
                                required: true
                            }
                        },
                        facebookID: {
                            type: "number",
                            defaultValue: 0,
                            validation: {
                                min: 0,
                                required: true
                            }
                        }
                    }
                }
            },
        // error: function(e) {
        //         if (e.errors) {
        //             alert(e.errors);
        //         }
        //     },

    });
        $("#contacts-grid").kendoGrid({
            dataSource: dataSource,
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
                template: "<a class='loginbtn' href='index.html\\#!/login'>#: fullName #</a>",
                // template:"<a class='loginbtn' href='#'>#: fullName #</a>",

                field: "fullName",
                title: "Contact Name",
                width: "15%",
                filterable: {
                    cell: {
                        showOperators: false
                    }
                }

            }, {
                template: "<a href='#: facebookURL #'  target='_blank'> #: facebookURL # </a>",
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

            },
            {
                command: ["edit", "destroy"],
                title: "&nbsp;",
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


    // function setDataSource() {
    //     $("#grid").data("kendoGrid").dataSource.read();
    // }

});