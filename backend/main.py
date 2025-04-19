from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import stripe
import os

app = FastAPI()

# Configure CORS to allow requests from your Firebase Hosting domain (adjust as needed)
origins = [
    "https://your-app-name.firebaseapp.com",
    "https://your-app-name.web.app",
    "http://localhost:3000", # For local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Replace with your actual Stripe secret key - ideally, store this in an environment variable
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

@app.get("/")
async def read_root():
    return JSONResponse({"message": "Welcome to the Serene Lotus Threads Backend!"})

@app.post('/api/create-payment-intent')
async def create_payment_intent(request: Request):
    try:
        data = await request.json()
        amount = data.get('amount')  # Amount in cents (or smallest currency unit)
        currency = data.get('currency', 'usd') # Default to USD, adjust as needed

        if amount is None or not isinstance(amount, int) or amount <= 0:
            return JSONResponse({'error': 'Invalid amount'}, status_code=400)

        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            # Optionally, you can include metadata like order ID
            # metadata={'order_id': 'YOUR_ORDER_ID'},
        )

        return JSONResponse({'clientSecret': intent.client_secret}, status_code=200)

    except Exception as e:
        return JSONResponse({'error': str(e)}, status_code=500)