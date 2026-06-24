// Inventory Data (Database Simulation)

let products = [
{
    id:1,
    name:"Laptop",
    stock:12
},
{
    id:2,
    name:"Keyboard",
    stock:4
},
{
    id:3,
    name:"Mouse",
    stock:8
},
{
    id:4,
    name:"Monitor",
    stock:2
}
];

const productList = document.getElementById("productList");

function renderProducts(){

    productList.innerHTML="";

    products.forEach(product=>{

        const card = document.createElement("div");
        card.classList.add("product-card");

        const lowStock = product.stock < 5;

        card.innerHTML=`
            <div class="product-info">
                <h3>${product.name}</h3>

                <p class="stock ${lowStock ? 'low-stock' : ''}">
                    Stock: ${product.stock}
                </p>

                ${
                    lowStock
                    ?
                    `<span class="warning">⚠ Low Stock Alert</span>`
                    :
                    ""
                }
            </div>

            <div class="controls">
                <button class="add" onclick="updateStock(${product.id},1)">
                    +
                </button>

                <button class="remove" onclick="updateStock(${product.id},-1)">
                    -
                </button>
            </div>
        `;

        productList.appendChild(card);
    });
}


// Simulated PATCH Request

function patchStock(id,newStock){

    return new Promise((resolve)=>{

        setTimeout(()=>{

            resolve({
                success:true,
                stock:newStock,
                warning:newStock < 5
                    ? "Warning: Stock below 5"
                    : null
            });

        },500);

    });

}


async function updateStock(id,change){

    const product = products.find(p=>p.id===id);

    let newStock = product.stock + change;

    if(newStock < 0){
        alert("Stock cannot be negative");
        return;
    }

    const response = await patchStock(id,newStock);

    if(response.success){

        product.stock = response.stock;

        if(response.warning){
            alert(response.warning);
        }

        renderProducts();
    }
}

renderProducts();