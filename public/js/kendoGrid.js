/**
 * Created by Hp on 29/12/2016.
 */
$(document).ready(function () {
    $("#grid").kendoGrid({
        theme: "MetroBlack",
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
            batch: true,
            pageSize: 6,
            schema: {
                model: {
                    id: "_id.$oid",
                    fields: {
                        "_id.$oid": { editable: false, nullable: true },
                        fullName: { defaultValue: 'Name',validation: { required: true } },
                        facebookURL: { defaultValue:'facebook.com', validation: { required: true} },
                        facebookID: {   defaultValue:0,type: "number",validation: { min: 0, required: true }
                        }

                    }
                }
            }
        },
        scrollable: false,
        sortable: true,
        pageable: {
//                    refresh: true,
            pageSizes: true,
            buttonCount: 3
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
                width: "70px"
            }, {
                template:"<a href='#: facebookURL #'  target='_blank'> #: facebookURL # </a>",
                field: "facebookURL",
                title: "Facebook profile URL",
                width: "20%"
            }, {
                field: "facebookID",
                title: "Facebook ID",

            } ,{
                command: ["edit", "destroy"], title: "&nbsp;"
            }],
        editable: "inline"
    });
});