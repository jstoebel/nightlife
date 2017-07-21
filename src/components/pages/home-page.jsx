import React, {Component} from 'react';
import MapContainer from '../containers/MapContainer'
import Map from '../ui/Map'
class HomePage extends Component {
    
  render() {
    const bars = [
    {
      "id": "wings-etc-berea",
      "name": "Wings Etc",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/pLUHPVMcFOsWEbG-TRcc-w/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/wings-etc-berea?adjust_creative=6hpmLpCOBesmccd08L3oBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6hpmLpCOBesmccd08L3oBA",
      "review_count": 2,
      "categories": [
        {
          "alias": "pubs",
          "title": "Pubs"
        },
        {
          "alias": "tradamerican",
          "title": "American (Traditional)"
        },
        {
          "alias": "wraps",
          "title": "Wraps"
        }
      ],
      "rating": 2.5,
      "coordinates": {
        "latitude": 37.5672799,
        "longitude": -84.31278
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "102 Jill Dr",
        "address2": "",
        "address3": null,
        "city": "Berea",
        "zip_code": "40403",
        "country": "US",
        "state": "KY",
        "display_address": [
          "102 Jill Dr",
          "Berea, KY 40403"
        ]
      },
      "phone": "+18597563568",
      "display_phone": "(859) 756-3568",
      "distance": 1115.37561776
    },
    {
      "id": "richmond-beer-house-richmond",
      "name": "Richmond Beer House",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/5k40dixHVs9p49t6s4qFWA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/richmond-beer-house-richmond?adjust_creative=6hpmLpCOBesmccd08L3oBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6hpmLpCOBesmccd08L3oBA",
      "review_count": 3,
      "categories": [
        {
          "alias": "beerbar",
          "title": "Beer Bar"
        }
      ],
      "rating": 5,
      "coordinates": {
        "latitude": 37.7344520070618,
        "longitude": -84.3165855109692
      },
      "transactions": [],
      "location": {
        "address1": "218 S Porter",
        "address2": "",
        "address3": null,
        "city": "Richmond",
        "zip_code": "40475",
        "country": "US",
        "state": "KY",
        "display_address": [
          "218 S Porter",
          "Richmond, KY 40475"
        ]
      },
      "phone": "+18593535330",
      "display_phone": "(859) 353-5330",
      "distance": 17991.59078056
    },
    {
      "id": "gillums-sports-lounge-richmond",
      "name": "Gillum's Sports Lounge",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/nDZcvrSddOnk9Djvl1fxOA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/gillums-sports-lounge-richmond?adjust_creative=6hpmLpCOBesmccd08L3oBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6hpmLpCOBesmccd08L3oBA",
      "review_count": 24,
      "categories": [
        {
          "alias": "sportsbars",
          "title": "Sports Bars"
        },
        {
          "alias": "cuban",
          "title": "Cuban"
        },
        {
          "alias": "tradamerican",
          "title": "American (Traditional)"
        }
      ],
      "rating": 4,
      "coordinates": {
        "latitude": 37.7301653867879,
        "longitude": -84.2795133590698
      },
      "transactions": [
        "delivery",
        "pickup"
      ],
      "price": "$$",
      "location": {
        "address1": "130 Richmond Mall",
        "address2": "",
        "address3": "",
        "city": "Richmond",
        "zip_code": "40475",
        "country": "US",
        "state": "KY",
        "display_address": [
          "130 Richmond Mall",
          "Richmond, KY 40475"
        ]
      },
      "phone": "+18596232335",
      "display_phone": "(859) 623-2335",
      "distance": 17556.52824232
    },
    {
      "id": "madison-garden-richmond",
      "name": "Madison Garden",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/OynjyzYoQaiDo2pJP-RoTw/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/madison-garden-richmond?adjust_creative=6hpmLpCOBesmccd08L3oBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6hpmLpCOBesmccd08L3oBA",
      "review_count": 49,
      "categories": [
        {
          "alias": "bars",
          "title": "Bars"
        },
        {
          "alias": "tradamerican",
          "title": "American (Traditional)"
        }
      ],
      "rating": 3,
      "coordinates": {
        "latitude": 37.7472,
        "longitude": -84.2925999
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "152 N Madison Ave",
        "address2": "",
        "address3": "",
        "city": "Richmond",
        "zip_code": "40475",
        "country": "US",
        "state": "KY",
        "display_address": [
          "152 N Madison Ave",
          "Richmond, KY 40475"
        ]
      },
      "phone": "+18596239720",
      "display_phone": "(859) 623-9720",
      "distance": 19360.40204284
    },
    {
      "id": "steam-engine-pizza-pub-irvine",
      "name": "Steam Engine Pizza Pub",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/dqHigIa6R4CDWL-dUa84xw/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/steam-engine-pizza-pub-irvine?adjust_creative=6hpmLpCOBesmccd08L3oBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6hpmLpCOBesmccd08L3oBA",
      "review_count": 5,
      "categories": [
        {
          "alias": "italian",
          "title": "Italian"
        },
        {
          "alias": "pubs",
          "title": "Pubs"
        },
        {
          "alias": "pizza",
          "title": "Pizza"
        }
      ],
      "rating": 5,
      "coordinates": {
        "latitude": 37.7009669691324,
        "longitude": -83.975303247571
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "206 Main St",
        "address2": "",
        "address3": "",
        "city": "Irvine",
        "zip_code": "40336",
        "country": "US",
        "state": "KY",
        "display_address": [
          "206 Main St",
          "Irvine, KY 40336"
        ]
      },
      "phone": "+16067239787",
      "display_phone": "(606) 723-9787",
      "distance": 31973.44657752
    },
    {
      "id": "the-copper-still-richmond",
      "name": "The Copper Still",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/7tdfYxj99uZPUuviMsRngA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/the-copper-still-richmond?adjust_creative=6hpmLpCOBesmccd08L3oBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6hpmLpCOBesmccd08L3oBA",
      "review_count": 3,
      "categories": [
        {
          "alias": "pubs",
          "title": "Pubs"
        }
      ],
      "rating": 3.5,
      "coordinates": {
        "latitude": 37.74704,
        "longitude": -84.29617
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "212 W Water St",
        "address2": null,
        "address3": "",
        "city": "Richmond",
        "zip_code": "40475",
        "country": "US",
        "state": "KY",
        "display_address": [
          "212 W Water St",
          "Richmond, KY 40475"
        ]
      },
      "phone": "+18596248110",
      "display_phone": "(859) 624-8110",
      "distance": 19349.03527442
    },
    {
      "id": "applebees-richmond-9",
      "name": "Applebee's",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/j10IWkGjx-FVDPM7kEHWIQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/applebees-richmond-9?adjust_creative=6hpmLpCOBesmccd08L3oBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6hpmLpCOBesmccd08L3oBA",
      "review_count": 10,
      "categories": [
        {
          "alias": "sportsbars",
          "title": "Sports Bars"
        },
        {
          "alias": "burgers",
          "title": "Burgers"
        },
        {
          "alias": "tradamerican",
          "title": "American (Traditional)"
        }
      ],
      "rating": 2,
      "coordinates": {
        "latitude": 37.7321,
        "longitude": -84.28137
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "853 Eastern Bypass",
        "address2": "",
        "address3": "",
        "city": "Richmond",
        "zip_code": "40475",
        "country": "US",
        "state": "KY",
        "display_address": [
          "853 Eastern Bypass",
          "Richmond, KY 40475"
        ]
      },
      "phone": "+18596241224",
      "display_phone": "(859) 624-1224",
      "distance": 17770.451371159998
    }
  ]
    return (
      <MapContainer bars={bars}/>
    );
  }
}

export default HomePage;
