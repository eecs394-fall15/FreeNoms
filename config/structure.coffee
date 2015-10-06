# Read more about app structure at http://docs.appgyver.com

module.exports =


 #  rootView:
  #   location: "event#index"
tabs: [
    {
      title: "Index"
      id: "index"
      location: "event#index" # Supersonic module#view type navigation
    }
    {
        title:"Datetime"
        id: "DateTime"
        location: "example#getting-started"
    }
    {
        title:"Maps"
        id: "Maps"
        location: "maps#index"
    }
  ] 

  preloads: [
    {
      id: "learn-more"
      location: "example#learn-more"
    }
    {
      id: "using-the-scanner"
      location: "example#using-the-scanner"
    }
  ]

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  # initialView:
  #   id: "initialView"
  #   location: "example#initial-view"
