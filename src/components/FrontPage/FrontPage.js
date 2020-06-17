import React from 'react'

import classes from './FrontPage.css'
import Header from '../UI/Header/Header'
import Footer from '../UI/Footer/Footer'
import Categories from '../UI/Categories/categories'
import Category from '../FrontPage/CategoriesDiv/categories'
import SpecialContent from '../FrontPage/SpecialContent/specialcontent'

const frontPage = () => {
    return(
        <div>
        <div className={classes.FrontPage + " container-fluid"}>
            <Header/>
            <Categories/>
            <div className={classes.Notification +" row"}>
                <p>Due to COVID-19, Only essentials like groceries will be delivered!</p>
                <h5>Other products will be available soon...</h5>
            </div>
            <div className= {classes.Categorylist + " row"}>
                <Category 
                imgLink ="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR5IVayihUtl-eBLhKkvOdvCJMdCGtkWpRlQXBiLXK_M4GS6pAK&usqp=CAU"
                h3Text = "Look for Mobile, Laptops & much more"
                link="/"/>
                <Category 
                imgLink = "https://image.freepik.com/free-photo/set-products-white-background-groceries-vegetables-butter-eggs-sausage-food-package_149088-714.jpg"
                h3Text = "Your daily groceries..Delivered!"
                link="/products"
                />

                <Category 
                imgLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4Tlk28J3TXWt9SzNUnkV6l8cMtK7BjLyGvC3EPKMaj7kFMKfH&usqp=CAU"
                h3Text = "For your reading hobby"
                link="/"
                />
                
                <Category 
                imgLink = "https://image.shutterstock.com/image-photo/assorted-sports-equipment-including-basketball-260nw-41646289.jpg"
                h3Text = "Get out and play"
                link="/"
                />
            </div>
            <SpecialContent 
                    imgLink = "https://www.usanetwork.com/sites/usanetwork/files/2016/09/Gabriel%20Macht%20Harvey%20Specter%201920.jpg" 
            />  
                 
        </div>
            <Footer/> 
        </div>
    )
}

export default frontPage