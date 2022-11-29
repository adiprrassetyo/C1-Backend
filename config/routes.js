const router = require("express").Router();
const {
  verifyToken,
  verifyAdmin,
} = require("../app/middleware/authMiddleware");
const {
  registerMember,
  login,
  getCurrentUser,
  putCurrentUser,
  logout,
} = require("../app/controllers/authControllers");
const {
  postUserData,
  getUserDataMember,
  updateUserData,
  deleteUserData,
} = require("../app/controllers/userControllers");
const {
    getAllWishlists,
    getWishlistById,
    findWhistlistByUser,
    findWhistlistByTicket,
    createWishlist,
    deleteWishlist
} = require("../app/controllers/wishlistsControllers");
const {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
} = require("../app/controllers/ticketsControllers");
const controllers = require("../app/controllers");
const uploadMiddleware = require("../app/middleware/uploadMiddleware");

// prefix
const prefix = "/api/v1";

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth routes
router.post(prefix + "/register", registerMember); //done
router.post(prefix + "/login", login); //done
router.delete(prefix + "/logout", logout); //done

// user routes
// get current user
router.get(prefix + "/user", verifyToken, getCurrentUser); //done
//  update current user with token
router.put(prefix + "/user", verifyToken, putCurrentUser); //done
// update current user with id
router.put(prefix + "/user/:id", verifyToken, updateUserData); //done

// admin CRUD user routes
router.get(
  prefix + "/admin/users",
  verifyToken,
  verifyAdmin,
  getUserDataMember
); //done
router.post(prefix + "/admin/users", verifyToken, verifyAdmin, postUserData); //done
router.put(
  prefix + "/admin/user/:id",
  verifyToken,
  verifyAdmin,
  updateUserData
); //done
router.delete(
  prefix + "/admin/user/:id",
  verifyToken,
  verifyAdmin,
  deleteUserData
); //done

//ticket api
router.get(prefix + "/tickets", 
    getAllTickets
); //get all tickets
router.get(prefix + "/tickets/:id",
    getTicketById
); //get ticket by id
router.post(prefix + "/tickets", 
    verifyToken,
    verifyAdmin,
    createTicket
); //create a ticket
router.put(
    prefix + "/tickets/:id",
    verifyToken,
    verifyAdmin,
    updateTicket
); //update a ticket
router.delete(
    prefix + "/tickets/:id",
    verifyToken,
    verifyAdmin,
    deleteTicket
); //delete a ticket

//wishlist api
router.get(
    prefix + "/wishlists",
    verifyToken,
    verifyAdmin,
    getAllWishlists
); //get all wishlists
router.get(
    prefix + "/wishlists/id/:id",
    verifyToken,
    getWishlistById
); //get a wishlist by id
router.get(
    prefix + "/wishlists/user/",
    verifyToken,
    findWhistlistByUser
); //get a wishlist by user id
router.get(
    prefix + "/wishlists/ticket/",
    verifyToken,
    verifyAdmin,
    findWhistlistByTicket
); //get a wishlist by ticket id
router.post(
    prefix + "/wishlists",
    verifyToken,
    createWishlist
); //create a wishlist
router.delete(
    prefix + "/wishlists/:id",
    verifyToken,
    deleteWishlist
); //delete a wishlist

//transactions api
router.get(prefix + "/trans",verifyToken, verifyAdmin, controllers.transControllers.getAllTrans);
router.get(prefix + "/trans/:id",verifyToken, controllers.transControllers.getTransByid);
router.get(
  prefix + "/trans/user/:id",
  verifyToken,
  controllers.transControllers.getTransByUserId
);
router.post(prefix + "/trans",verifyToken, controllers.transControllers.createTrans);
router.delete(
  prefix + "/trans/:id",
  verifyToken,
  verifyAdmin,
  controllers.transControllers.deleteTransById
);
router.put(
  prefix + "/trans/:id",
  verifyToken,
  uploadMiddleware,
  controllers.transControllers.updateTrans
);

module.exports = router;
