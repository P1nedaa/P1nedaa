// use('sample_airbnb');

// db.listingsAndReviews.aggregate([
//     {
//         $project: {
//             _id: true,
//             name: true,
//             amenities_count: { $size: "$amenities" }
//         }
//     },	
//     {
//         $sort: { amenities_count: -1 }
//     },
//     {
//         $limit: 1
//     }
// ])

// db.listingsAndReviews.aggregate([
//     {
//         $match: {
//             amenities: { $in: ["Wifi", "Ethernet"] }
//         }
//     },
//     {
//         $count: "total"
//     }
// ])

// db.listingsAndReviews.aggregate([
//   {
//     $match: {
//       "address.country": "Brazil",
//       "review_scores.review_scores_rating": { $gte: 80 },
//       "amenities": /Ethernet/g,
//       "reviews": { $exists: true },
//       $expr: { $gte: [{ $size: "$reviews" }, 50] }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       name: 1,
//       address: 1,
//       review_score_rating: "$review_scores.review_scores_rating"
//     }
//   }
// ])


// db.listingsAndReviews.aggregate([
//     {
//         $match: {
//             "property_type": "House"
//         }
//     },
//     {
//         $group: {
//             _id: "$address.country",
//             avg_price: { $avg: "$price" }
//         }
//     }
// ])


// CHARTS PUNTO 5: https://charts.mongodb.com/charts-project-0-oaiqm/public/dashboards/645702f6-6fa3-4967-8570-fbce15b7c971