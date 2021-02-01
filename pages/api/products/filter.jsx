import excuteQuery  from '../db/connection.js'

export default async  function handler(req, res) {

    // console.log(req.params.category)
    if(req.method  == 'POST'){

            var category = ""
            var brand = ""
            var color = ""
            var price = ""
            var feature = ""

        if(req.body.category){

            category =" AND products.category_id = " + req.body.category;

        }

        if(req.body.brand){

            brand =" AND products.brand_id = " + req.body.brand;

       }

       if(req.body.color){

        color =" AND products.color = '" + req.body.color + "'";

      }

      if(req.body.price){

        price =" AND products.color = '" + req.body.price + "'";

      }

      if(req.body.feature){

          feature = " AND features.key =  '" + req.body.feature + "'";

      }


        try {

            const result = await excuteQuery({

                query : "SELECT products.id , products.name , products.description , products.price, products.color ,features.key,  features.value FROM products LEFT JOIN features ON features.product_id = products.id WHERE '1'" + category + brand + color + feature

            });           

          
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ data: result }))
          
        } catch ( error ) {
            console.log( error );
        }
        

        
    }
  }