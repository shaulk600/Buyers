import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext"
import type { ProductType } from "../../logic/ProductType";
import { getProduct, updateProduct } from "../../logic/api/product.api";


export default function Comments({ productId }: { productId: string }) {
    console.log('Comments component rendering with productId:', productId);

    const { user } = useUser();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    console.log('Current user:', user);
    console.log('Current product:', product);

    const fetchProduct = async () => {
        console.log('Fetching product with ID:', productId);
        try {
            setError(null);
            const data = await getProduct(productId);
            console.log('Product fetched successfully:', data);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError("Failed to load product.");
        }
    }
    
    useEffect(() => {
        console.log('useEffect triggered, productId:', productId);
        if (productId) {
            fetchProduct();
        } else {
            console.warn('No productId provided');
        }
    }, [productId]);

    const handleAddComment = async () => {
        console.log('Adding comment:', newComment);
        setError(null);
        if (!newComment.trim()) {
            console.log('Empty comment, returning');
            return;
        }

        if (!user) {
            console.log('No user logged in');
            return setError("You must be logged in to comment.");
        }
        if (!product) {
            console.log('No product loaded');
            return setError("Product not loaded yet.");
        }

        setLoading(true);

        try {
            const userId = (user as any).id || user.email || Date.now();
            console.log('Using userId:', userId);
            
            const updatedProduct: ProductType = {
                ...product,
                comments: [
                    ...product.comments,
                    { 
                        id: typeof userId === 'number' ? userId : parseInt(String(userId)) || Date.now(),
                        text: newComment.trim() 
                    },
                ],
            }

            console.log('Updating product with new comment:', updatedProduct);
            const result = await updateProduct(product._id, updatedProduct);
            console.log('Product updated successfully:', result);
            setProduct(result);
            setNewComment("");

        } catch (error) {
            console.error('Error adding comment:', error);
            setError("Failed to add comment. Try again.");
        } finally {
            setLoading(false);
        }
    }

    // Always render something to test if component is being called
    return (
        <div>
            <h3>Comments</h3>
            <p>ProductId: {productId || 'No productId'}</p>
            <p>User: {user ? 'Logged in' : 'Not logged in'}</p>
            <p>Product: {product ? 'Loaded' : 'Not loaded'}</p>

            {error && <div>Error: {error}</div>}

            {!product ? (
                <div>Loading comments...</div>
            ) : (
                <>
                    <div>
                        <strong>Comments ({product.comments?.length || 0}):</strong>
                    </div>
                    <ul>
                        {(!product.comments || product.comments.length === 0) && 
                            <li>No comments yet.</li>
                        }
                        {product.comments?.map((c, i) => {
                            const currentUserId = (user as any)?.id || user?.email;
                            const commentUserId = c.id;
                            
                            const authorName =
                                user && (currentUserId === commentUserId || 
                                        String(currentUserId) === String(commentUserId))
                                    ? (user as any).username ?? (user as any).name ?? "You"
                                    : `User ${c.id}`;

                            return (
                                <li key={`comment-${i}-${c.id || 'unknown'}`}>
                                    <strong>{authorName}:</strong> {c.text}
                                </li>
                            );
                        })}
                    </ul>

                    {!user && (
                        <p>Log in to leave a comment.</p>
                    )}

                    <div style={{ marginTop: '10px' }}>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={user ? "Write a comment..." : "Log in to comment"}
                            disabled={!user || loading}
                        />
                        <button
                            onClick={handleAddComment}
                            disabled={!user || loading || !newComment.trim()}
                            
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
