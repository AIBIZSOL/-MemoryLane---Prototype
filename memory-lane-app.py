import gradio as gr
import time
import random
import os
import requests
import json

# Default content for demonstration purposes
DEFAULT_STORY = """My first day of high school was a mix of excitement and nervousness. The building seemed enormous compared to my middle school, with long hallways that stretched forever and classrooms that all looked the same. I remember getting lost trying to find my algebra class and arriving ten minutes late, my face burning with embarrassment as everyone turned to look at me.

At lunch, I didn't know where to sit until Maria, a girl from my homeroom, waved me over. We bonded over our shared love of science fiction books. That simple act of kindness made the whole day better.

The science teacher, Mr. Peterson, made an impression right away. He started class by mixing chemicals that erupted in a colorful foam that spilled across his desk while we all gasped and laughed. "Chemistry," he announced with a grin, "is just as messy as high school life."

Those early school friendships and memorable teachers shaped so much of who I became. Looking back now, I can see how those seemingly small moments were actually the beginning of some of the most important relationships in my life."""

DEFAULT_REFINED_STORY = """My first day of high school was a symphony of butterflies and possibilities. The imposing redbrick building loomed before me, its corridors stretching like labyrinths compared to the cozy confines of my middle school. Freshly waxed floors gleamed under fluorescent lights, reflecting the nervous faces of fellow freshmen as we navigated this new world.

I can still feel the weight of my overstuffed backpack cutting into my shoulders as I frantically searched for Room 237. The ticking clock echoed my racing heartbeat until, finally, I pushed open the door to algebra class ten minutes late. The squeak of the hinges might as well have been a bullhorn announcing my arrival, and heat rushed to my cheeks as twenty-four pairs of curious eyes turned in perfect unison.

The cafeteria at noon was a sociological experiment – hundreds of teenagers instinctively sorting themselves into tribal tables. I stood frozen, lunch tray gripped with white knuckles, until I heard someone call my name. Maria, with her infectious smile and constellation of freckles, patted the empty seat beside her. "You mentioned Asimov in homeroom," she said, pulling out a dog-eared copy of Foundation from her bag. In that moment, between comparing favorite chapters and debating the laws of robotics, the vastness of high school shrank to the size of our shared imagination.

I'll never forget walking into seventh-period science. Mr. Peterson, with his Einstein-wild hair and bow tie slightly askew, stood behind a cluttered desk with the focused expression of a mad scientist. Without introduction, he combined liquids from two beakers, creating a volcanic reaction of purple foam that cascaded over his desk and nearly reached our front-row seats. As we gasped and jumped back, his laughter filled the room. "Chemistry," he announced with theatrical timing, eyes twinkling behind safety goggles, "is just as surprising, messy, and fascinating as high school life itself."

Those seemingly ordinary moments – Maria's extended hand of friendship and Mr. Peterson's dramatic introduction – became the first brushstrokes on the canvas of my adolescence. What I couldn't appreciate then, but see with perfect clarity now, is how those chance encounters in fluorescent-lit hallways were silently shaping the person I would become."""

# Default storyboard content
DEFAULT_STORYBOARD = """## Storyboard Created: 4 Scenes

### Scene 1:
- **Narration:** "My first day of high school was a symphony of butterflies and possibilities. The imposing redbrick building loomed before me, its corridors stretching like labyrinths compared to the cozy confines of my middle school."
- **Visual:** School photo 1 with nostalgic filter
- **Music:** Gentle ambient music reflecting early 2000s era

### Scene 2:
- **Narration:** "The cafeteria at noon was a sociological experiment – hundreds of teenagers instinctively sorting themselves into tribal tables. I stood frozen, lunch tray gripped with white knuckles, until I heard someone call my name."
- **Visual:** School photo 2 with nostalgic filter
- **Music:** Soft piano underscoring the moment of connection

### Scene 3:
- **Narration:** "Mr. Peterson, with his Einstein-wild hair and bow tie slightly askew, stood behind a cluttered desk with the focused expression of a mad scientist. Without introduction, he combined liquids from two beakers..."
- **Visual:** School photo 3 with nostalgic filter
- **Music:** Playful, curious melody with science-lab inspired sounds

### Scene 4:
- **Narration:** "Those seemingly ordinary moments became the first brushstrokes on the canvas of my adolescence. What I couldn't appreciate then, but see with perfect clarity now..."
- **Visual:** School photo 1 transitioning gradually to present day
- **Music:** Emotional crescendo reflecting personal growth and nostalgia
"""

# Available AI models with correct Ollama model names
AVAILABLE_MODELS = {
    "llama": "llama4:latest",
    "llava": "llava:34b",
    "mistral": "mistral-small3.1:24b"
}

# Ollama API endpoints
OLLAMA_BASE_URL = "http://localhost:11434"
CHAT_ENDPOINT = f"{OLLAMA_BASE_URL}/api/chat"
GENERATE_ENDPOINT = f"{OLLAMA_BASE_URL}/api/generate"

def refine_story_with_ai(story_text, prompt="", model_name="mistral-small3.1:24b", stream=True):
    """Uses Ollama API to refine a user's school memory story"""
    # Fall back to simulated refinement if API call fails
    try:
        # Create a contextual prompt for the AI
        refinement_prompt = f"""
        You are a skilled memory storyteller specialized in enhancing personal school memories.
        Your task is to refine the following school memory story while maintaining the original voice and authenticity.
        
        Original story:
        "{story_text}"
        
        Refinement instructions: {prompt}
        
        Guidelines:
        - Keep the core memories intact
        - Maintain the author's voice and perspective
        - Add sensory details to make memories more vivid
        - Improve narrative flow and emotional resonance
        - Highlight meaningful connections between events and people
        - If no specific refinement instructions are given, focus on enhancing descriptive elements and emotional depth
        
        Please provide the refined story without explanations or meta-commentary about the changes you made.
        """
        
        # Prepare the API request
        headers = {"Content-Type": "application/json"}
        payload = {
            "model": model_name,
            "messages": [{"role": "user", "content": refinement_prompt}],
            "stream": stream,
            "options": {
                "temperature": 0.7,
                "top_p": 0.9
            }
        }
        
        if stream:
            # For streaming implementation (would need to be handled differently in gradio)
            full_response = ""
            with requests.post(CHAT_ENDPOINT, json=payload, headers=headers, stream=True) as response:
                response.raise_for_status()
                for line in response.iter_lines():
                    if line:
                        try:
                            json_response = json.loads(line)
                            if 'message' in json_response and 'content' in json_response['message']:
                                full_response += json_response['message']['content']
                        except json.JSONDecodeError:
                            continue
            return full_response
        else:
            # For non-streaming implementation
            response = requests.post(CHAT_ENDPOINT, json=payload, headers=headers)
            response.raise_for_status()
            result = response.json()
            if 'message' in result and 'content' in result['message']:
                return result['message']['content']
            else:
                raise Exception("Unexpected response format")
                
    except Exception as e:
        # Fallback to simulate refinement if API call fails
        print(f"Ollama API call failed: {str(e)}. Using fallback simulation.")
        return refine_story_fallback(story_text, prompt)

def refine_story_fallback(story_text, prompt=""):
    """Fallback function that simulates AI refinement if API calls fail"""
    time.sleep(1)  # Simulate processing time
    refined = story_text
    
    if prompt:
        if "more details" in prompt.lower():
            refined += "\n\nThe AI has added more sensory details to your story, enhancing the descriptions of your school environment and the emotions you felt during those moments."
        elif "humor" in prompt.lower():
            refined += "\n\nThe AI has added some light-hearted moments and humorous observations to your school memories, highlighting the funny aspects of your experiences."
        elif "emotional" in prompt.lower():
            refined += "\n\nThe AI has emphasized the emotional journey of your school days, highlighting the connections, growth, and transformative moments."
        elif "cohort" in prompt.lower() or "culture" in prompt.lower():
            refined += "\n\nThe AI has adapted your story to reflect cultural elements and experiences relevant to the specified cohort, while preserving your core memories."
        elif "dialogue" in prompt.lower() or "conversation" in prompt.lower():
            refined += "\n\nThe AI has added natural dialogue between characters to bring your school memories to life through conversation."
    
    return refined + "\n\n[AI has refined your story while maintaining your authentic voice and memories.]"

def refine_story(story_text, prompt="", model_choice="mistral"):
    """Wrapper function to handle different refining approaches"""
    if not story_text.strip():
        return "Please enter your school memories first."
    
    # Use the actual API if available, otherwise use the fallback
    try:
        model_name = AVAILABLE_MODELS.get(model_choice.lower(), "mistral-small:24b")
        return refine_story_with_ai(story_text, prompt, model_name, stream=False)
    except Exception as e:
        print(f"Error using Ollama API: {str(e)}")
        return refine_story_fallback(story_text, prompt)

def create_storyboard(story_text, uploaded_images):
    """Simulates creating a storyboard from story text and images"""
    time.sleep(2)  # Simulate processing time
    
    if not uploaded_images:
        return "Please upload at least one school photo to create a storyboard."
    
    # Count paragraphs as scenes
    paragraphs = [p for p in story_text.split("\n\n") if p.strip()]
    scene_count = len(paragraphs)
    
    storyboard = f"## Storyboard Created: {scene_count} Scenes\n\n"
    
    for i, paragraph in enumerate(paragraphs[:3], 1):  # Show up to 3 scenes
        storyboard += f"### Scene {i}:\n"
        storyboard += f"- **Narration:** \"{paragraph[:75]}...\"\n"
        storyboard += f"- **Visual:** School photo {(i-1) % len(uploaded_images) + 1} with nostalgic filter\n"
        storyboard += f"- **Music:** Gentle ambient music reflecting school era\n\n"
    
    if scene_count > 3:
        storyboard += f"### ...and {scene_count - 3} more scenes\n\n"
    
    return storyboard

def preview_video(storyboard_text, uploaded_images):
    """Simulates video creation preview based on storyboard and images"""
    time.sleep(3)  # Simulate longer processing time for video
    
    if not uploaded_images:
        return "Please upload school photos to generate a video preview."
    
    image_count = len(uploaded_images)
    
    video_description = f"""
    # Video Preview Generated
    
    ## Video Specifications:
    - **Duration:** 2:15 minutes
    - **Resolution:** 1080p
    - **Style:** Nostalgic documentary with gentle transitions
    - **Images Used:** {image_count} school photos
    
    ## What to Expect:
    - AI-generated voice narration of your school memories
    - Photo enhancement with period-appropriate visual effects
    - Background music matching the era of your school days
    - Subtle animations bringing still photos to life
    - Emotional pacing that follows the arc of your story
    
    ## Next Steps:
    In a real implementation, you would see a preview player here
    and have options to adjust narration, music, and visual effects
    before finalizing your memory video.
    
    [The video would begin with a gentle fade-in to your first school photo,
    with soft music playing as the narration of your memories begins...]
    """
    
    return video_description

def update_progress(step):
    """Updates the progress indicator"""
    progress = {
        "story": 0, 
        "storyboard": 0, 
        "video": 0,
        "current_step": step
    }
    
    if step == "story":
        progress["story"] = 100
    elif step == "storyboard":
        progress["story"] = 100
        progress["storyboard"] = 100
    elif step == "video":
        progress["story"] = 100
        progress["storyboard"] = 100
        progress["video"] = 100
        
    return progress

# Main application
with gr.Blocks(theme=gr.themes.Soft(primary_hue="indigo"), title="Memory Lane: Past School Days") as app:
    # Header
    with gr.Row():
        gr.Markdown("# Memory Lane: Past School Days")
        with gr.Column(scale=1, min_width=200):
            gr.Markdown("Welcome, User")
    
    # Navigation Tabs
    with gr.Tabs() as tabs:
        dashboard_tab = gr.Tab("Dashboard")
        story_tab = gr.Tab("My Story")
        storyboard_tab = gr.Tab("Storyboard")
        video_tab = gr.Tab("Video Creation")
    
    # Dashboard Tab Content
    with dashboard_tab:
        gr.Markdown("## Your Memory Project")
        
        # Progress indicators
        progress_status = gr.JSON(
            value={
                "story": 0, 
                "storyboard": 0, 
                "video": 0,
                "current_step": "none"
            },
            label="Project Progress"
        )
        
        with gr.Row():
            with gr.Column():
                gr.Markdown("### Story Creation")
                story_progress = gr.Slider(
                    minimum=0, 
                    maximum=100, 
                    value=0, 
                    label="Story Progress",
                    interactive=False
                )
            
            with gr.Column():
                gr.Markdown("### Storyboard Creation")
                storyboard_progress = gr.Slider(
                    minimum=0, 
                    maximum=100, 
                    value=0, 
                    label="Storyboard Progress",
                    interactive=False
                )
            
            with gr.Column():
                gr.Markdown("### Video Creation")
                video_progress = gr.Slider(
                    minimum=0, 
                    maximum=100, 
                    value=0, 
                    label="Video Progress",
                    interactive=False
                )
        
        # Project overview
        gr.Markdown("""
        ## How It Works:
        
        1. **Tell Your Story** - Write about your school memories, and AI will help refine them
        2. **Create a Storyboard** - Upload school photos and combine them with your story
        3. **Generate a Video** - Transform your storyboard into a nostalgic video memory
        
        Go to the tabs above to work on each phase of your memory project.
        """)
    
    # Story Tab Content
    with story_tab:
        gr.Markdown("## Tell Your School Memories")
        
        with gr.Row():
            with gr.Column(scale=2):
                story_input = gr.Textbox(
                    placeholder="Start writing about your school days memories here...",
                    lines=10,
                    label="Your School Memories"
                )
                
                refine_prompt = gr.Textbox(
                    placeholder="Tell the AI how to help (e.g., 'add more details', 'make more humorous', 'adapt to Chinese cohort')",
                    label="AI Refinement Instructions",
                    lines=6
                )
            
            with gr.Column(scale=1):
                gr.Markdown("### Story Enhancement Options")
                cohort_input = gr.Textbox(
                    label="Cultural Cohort (Optional)",
                    placeholder="e.g., Chinese, Japanese, Western, etc."
                )
                
                school_type = gr.Textbox(
                    label="School Type (Optional)",
                    placeholder="e.g., Boarding school, Public school, etc."
                )
                
                model_choice = gr.Dropdown(
                    choices=["mistral", "llama", "llava"],
                    label="Choose AI Model",
                    value="mistral",
                    info="Select the AI model for story refinement"
                )
                
                gr.Markdown("""
                **Model Guide:**
                - **Mistral**: Precise, nuanced refinements (Default)
                - **Llama**: Creative, elaborate enhancements
                - **Llava**: Better interprete photo context
                """)
        
        with gr.Row():
            load_example_btn = gr.Button("Load Example Story", variant="secondary")
            refine_btn = gr.Button("Refine My Story with AI", variant="primary")
            cohort_btn = gr.Button("Adapt to Cultural Context")
            dialogue_btn = gr.Button("Add Natural Dialogue")
        
        refined_story = gr.Textbox(
            lines=12,
            label="AI-Refined Story",
            placeholder="Your refined story will appear here..."
        )
        
        with gr.Row():
            story_save_btn = gr.Button("Save Story & Continue to Storyboard", variant="primary")
            reset_btn = gr.Button("Reset Story")
    
    # Storyboard Tab Content
    with storyboard_tab:
        gr.Markdown("## Create Your Storyboard")
        
        with gr.Row():
            with gr.Column():
                gr.Markdown("### Your Story")
                storyboard_story_display = gr.Textbox(
                    lines=8,
                    label="Your Story",
                    interactive=False
                )
            
            with gr.Column():
                gr.Markdown("### Upload School Photos")
                photo_upload = gr.File(
                    file_count="multiple",
                    label="Upload School Photos",
                    file_types=["image"]
                )
        
        load_example_storyboard_btn = gr.Button("Load Example Storyboard", variant="secondary")

        create_storyboard_btn = gr.Button("Create Storyboard from Story & Photos")
        
        storyboard_output = gr.Markdown(label="Your Storyboard")
        
        storyboard_save_btn = gr.Button("Save Storyboard & Continue to Video")
    
    # Video Creation Tab Content
    with video_tab:
        gr.Markdown("## Generate Your Memory Video")
        
        with gr.Row():
            with gr.Column():
                gr.Markdown("### Your Storyboard")
                video_storyboard_display = gr.Markdown()
            
            with gr.Column():
                gr.Markdown("### Your Photos")
                video_photos_display = gr.Gallery(label="School Photos")
        
        generate_video_btn = gr.Button("Generate 2-3 Minute Memory Video")
        
        video_preview = gr.Markdown(label="Video Preview")
        
        video_download_btn = gr.Button("Download Memory Video")
        video_download_btn.click(lambda: None)  # Placeholder function
    
    # Wire up the events
    refine_btn.click(
        fn=refine_story,
        inputs=[story_input, refine_prompt, model_choice],
        outputs=refined_story
    )
    
    # Function to adapt story to cultural cohort
    def adapt_to_cohort(story, cohort, model_choice):
        if not story.strip():
            return "Please enter your school memories first."
        if not cohort.strip():
            return "Please specify a cultural cohort."
        
        cohort_prompt = f"Adapt this story to reflect school experiences in {cohort} culture. " \
                      f"Include cultural elements, traditions, and educational practices specific to {cohort} schools. " \
                      f"Maintain the core memories but adjust settings, references, and character interactions."
        
        return refine_story(story, cohort_prompt, model_choice)
    
    # Function to add dialogue
    def add_dialogue(story, model_choice):
        if not story.strip():
            return "Please enter your school memories first."
        
        dialogue_prompt = "Add natural, authentic dialogue between characters to make the school memories more vivid. " \
                         "Create conversations that reveal personalities, relationships, and emotions while maintaining the story's authenticity."
        
        return refine_story(story, dialogue_prompt, model_choice)
    
    # Function to reset story
    def reset_story():
        return "", ""
    
    # Connect additional buttons
    cohort_btn.click(
        fn=adapt_to_cohort,
        inputs=[story_input, cohort_input, model_choice],
        outputs=refined_story
    )
    
    dialogue_btn.click(
        fn=add_dialogue,
        inputs=[story_input, model_choice],
        outputs=refined_story
    )
    
    reset_btn.click(
        fn=reset_story,
        inputs=[],
        outputs=[story_input, refined_story]
    )
    
    def save_story_and_update(story):
        status = update_progress("story")
        return story, status
    
    story_save_btn.click(
        fn=save_story_and_update,
        inputs=refined_story,
        outputs=[storyboard_story_display, progress_status]
    ).then(
        fn=lambda: gr.update(selected="Storyboard"),
        outputs=tabs
    )
    
    def create_and_save_storyboard(story, photos):
        storyboard = create_storyboard(story, photos)
        status = update_progress("storyboard")
        return storyboard, storyboard, photos, status
    
    create_storyboard_btn.click(
        fn=create_and_save_storyboard,
        inputs=[storyboard_story_display, photo_upload],
        outputs=[storyboard_output, video_storyboard_display, video_photos_display, progress_status]
    )
    
    storyboard_save_btn.click(
        fn=lambda: gr.update(selected="Video Creation"),
        outputs=tabs
    )
    
    def generate_video_and_update(storyboard, photos):
        video = preview_video(storyboard, photos)
        status = update_progress("video")
        return video, status
    
    generate_video_btn.click(
        fn=generate_video_and_update,
        inputs=[video_storyboard_display, photo_upload],
        outputs=[video_preview, progress_status]
    )
    
    # Update progress UI based on progress status changes
    def update_progress_ui(progress_data):
        return (
            progress_data["story"], 
            progress_data["storyboard"],
            progress_data["video"]
        )
    
    progress_status.change(
        fn=update_progress_ui,
        inputs=progress_status,
        outputs=[story_progress, storyboard_progress, video_progress]
    )

    def load_example_story():
        """Loads example content into the story input box"""
        return DEFAULT_STORY

    # Connect the load example button to the function
    load_example_btn.click(
        fn=load_example_story,
        inputs=[],
        outputs=[story_input]
    )
    
    def load_example_storyboard():
        """Loads example storyboard and refined story"""
        status = update_progress("storyboard")
        return DEFAULT_REFINED_STORY, DEFAULT_STORYBOARD, status

    # Connect the load example storyboard button
    load_example_storyboard_btn.click(
        fn=load_example_storyboard,
        inputs=[],
        outputs=[storyboard_story_display, storyboard_output, progress_status]
    )
# For deployment
if __name__ == "__main__":
    app.launch()
